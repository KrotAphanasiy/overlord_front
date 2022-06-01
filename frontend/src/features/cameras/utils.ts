import { toast } from "react-toastify";
import { trigger } from "swr";
import { isEqual, omit, find, compact } from 'lodash';

import {
  updateCameraData,
  updateRegion,
  createRegion,
  deleteRegion,
  createCamera,
} from "./api";

import { Camera, Region, CameraEdit } from "./types";

export const getCameraData = (camera: Camera) => ({
  Имя: camera.name,
  Станция: camera.gasStationId,
  "URL подключения к камере": camera.connectionUrl,
  "API-ключ": camera.apiKey,
  Заметки: camera.notes,
  "Дата редактирования": camera.updatedDate,
});

export const getShortCameraData = (camera: Camera) => ({
  Имя: camera.name,
  Заметки: camera.notes,
  "Дата редактирования": camera.updatedDate,
  "URL подключения к камере": camera.connectionUrl
});

export const getShortRegionData = (region: Region) => ({
  "Имя региона": region.regionName,
  topLeftX: region.topLeftX,
  topLeftY: region.topLeftY,
  bottomRightX: region.bottomRightX,
  bottomRightY: region.bottomRightY,
  "Дата редактирования": region.updatedDate,
});

export const getRegionData = (region: Region) => ({
  id: region.id,
  "Имя региона": region.regionName,
  "ID детектора": region.cameraId,
  topLeftX: region.topLeftX,
  topLeftY: region.topLeftY,
  bottomRightX: region.bottomRightX,
  bottomRightY: region.bottomRightY,
  "Дата редактирования": region.updatedDate,
  "Дата создания": region.createdDate,
});

export const submitEditCameraForm = async (
  oldCamera: Camera,
  newCamera: CameraEdit | Camera,
) => {
  const cameraChanged = !isEqual(omit(oldCamera, 'regions'), omit(newCamera, 'regions'));
  const regionsToDelete = oldCamera.regions?.filter(({ id }) => {
    return !newCamera.regions?.some(region => region.id === id);
  }) ?? [];

  const regionsToUpdate = compact(oldCamera.regions.filter(region => {
    const regionToCompare = newCamera.regions.find(({ id }) => region.id === id);
    return !isEqual(region, regionToCompare) && regionToCompare;
  }).map(({ id }) => find(newCamera.regions, ['id', id])));

  const regionsToCreate = newCamera.regions.filter((region) => 'isNew' in region);

  if (regionsToDelete.length) await submitRegionsDeletings(oldCamera, newCamera);

  const messages: string[] = [];
  const errors: string[] = [];

  if (regionsToCreate.length) {
    const createRegionsPromises = regionsToCreate.map((regionToCreate) => createRegion(omit(regionToCreate, 'isNew')))

    try {
      await Promise.all(createRegionsPromises);
      messages.push('Регионы успешно созданы');
    } catch (err) {
      errors.push('Не удалось создать регионы');
    }
  }

  if (regionsToUpdate.length) {
    const updateRegionsPromises = regionsToUpdate.map((regionToUpdate) => updateRegion(regionToUpdate));

    try {
      await Promise.all(updateRegionsPromises);
      messages.push('Регионы успешно обновлены');
    } catch (err) {
      errors.push('Не удалось обновить регионы');
    }
  }

  if (cameraChanged) await submitCameraDataUpdate(newCamera);

  messages.forEach(message => toast.success(message));
  errors.forEach(error => toast.error(error));

  trigger(`Camera/${oldCamera.id}`);
  trigger(`Terminal/paged/available?gasStationId=${oldCamera.gasStationId}&pageNumber=1&pageSize=2147483640`);
};

const submitCameraDataUpdate = async (newCamera: CameraEdit) =>
  updateCameraData(newCamera.id, newCamera)
    .then(() => toast.success("Данные о детекторе успешно обновлены"))
    .catch((e) => {
      toast.error("Ошибка при обновлении данных детектора");
      console.log(e);
    });

const submitRegionsDeletings = async (oldCamera: Camera, newCamera: CameraEdit) => {
  let hasDeletings = false;
  try {
    for (const oldRegion of oldCamera.regions) {
      if (!newCamera.regions.find((region) => region.id === oldRegion.id)) {
        // Delete an region
        hasDeletings = true;
        await deleteRegion(oldRegion);
      }
    }
    if (hasDeletings) toast.success("Регионы успешно удалены");
  } catch (e) {
    console.log(e);
    toast.error("Ошибка при удалении регионов");
  }
};

export const submitCreateCameraForm = async (camera: Camera) => {
  try {
    const { data: { data: newCamera } } = await createCamera(omit(camera, 'regions'));
    toast.success("Детектор успешно создан");

    const promises = camera.regions.map(region => {
      return createRegion({ ...region, cameraId: newCamera.id });
    });

    const regionsResponses = await Promise.all(promises);
    if (promises.length) toast.success("Регионы успешно созданы")

    const regions = regionsResponses.map(({ data: { data } }) => data);

    return {
      ...newCamera,
      regions,
    };
  } catch (err) {
    toast.error("Ошибка при создании детектора");
    console.log(err);
    return null;
  }
}