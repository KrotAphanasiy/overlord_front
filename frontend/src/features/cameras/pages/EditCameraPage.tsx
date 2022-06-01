import { FC, Fragment, useState, useCallback, useEffect } from 'react';

import { toast } from 'react-toastify';

import { useParams } from "react-router-dom";

import { CircularProgress } from '@material-ui/core';

import { Layout } from "features/layout";
import { Headline } from "features/misc";
import CameraForm from "features/cameras/components/CameraForm";

import { getCamera } from "features/cameras/api";
import { submitEditCameraForm } from "features/cameras/utils";

import { Camera } from "features/cameras";

const EditCameraPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const [cameraData, setCameraData] = useState<Camera | null>(null);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (newCamera) => {
    if (!cameraData) return;
    
    try {
      setIsEditLoading(true);
      await submitEditCameraForm(cameraData, newCamera)
    } catch(err) {
      toast.error(JSON.stringify('Что-то пошло не так'));
      console.error(err);
    } finally {
      const { data : { data } } = await getCamera(id);
      setCameraData(data);
      setIsEditLoading(false);
    }
  }, [cameraData, id]);

  useEffect(() => {
    if (id) {
      getCamera(id)
        .then(({ data: { data } }) => setCameraData(data))
        .catch(err => {
          toast.error('Что-то пошло не так');
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <Layout title={`Настройки детектора ${id}`}>
      <Headline level="1" text="Настройки детектора" />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Fragment>
          {cameraData && (
            <CameraForm
              initialCameraData={cameraData}
              onSubmit={handleSubmit}
              isLoading={isEditLoading}
            />
          )}
        </Fragment>
      )}
    </Layout>
  );
}

export default EditCameraPage;
