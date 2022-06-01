import { FC, useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Layout } from "features/layout";
import { Headline } from "features/misc";
import { Camera } from 'features/cameras';

import CameraForm from "features/cameras/components/CameraForm";

import { submitCreateCameraForm } from "features/cameras/utils";

const CreateCameraPage: FC = () => {
  const { push } = useHistory();
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const handleCreateCamera = useCallback(async (camera: Camera) => {
    try {
      setIsCreateLoading(true);
      const newCamera = await submitCreateCameraForm(camera);

      if (newCamera) push(`/cameras/${newCamera.id}`);
    } catch (err) {
      toast.error('Что-то пошло не так');
      console.error(err);
    } finally {
      setIsCreateLoading(false);
    }
  }, [push]);

  return (
    <Layout title="Создать детектор">
      <Headline level="1" text="Создать детектор" />
      <CameraForm
        initialCameraData={{
          name: "",
          connectionUrl: "",
          notes: "",
          apiKey: "",
          regions: [],
        }}
        onSubmit={handleCreateCamera}
        isLoading={isCreateLoading}
      />
    </Layout>
  );
};

export default CreateCameraPage;
