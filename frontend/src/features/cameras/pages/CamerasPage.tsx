import { Add } from "@material-ui/icons";
import { Layout } from "features/layout";
import { Headline, Loading, NotFound } from "features/misc";
import CamerasList from "../components/CamerasList";
import { useCameras } from "../hooks";
import { Camera } from "../types";
import CreateCameraPage from "./CreateCameraPage";

export default function CamerasPage() {
  const { data, error } = useCameras();

  return (
    <Layout
      title="Детекторы"
      additionalRoutes={[
        {
          name: "Добавить детектор",
          path: "/cameras/create",
          icon: <Add />,
          component: CreateCameraPage,
        },
      ]}
    >
      <Headline level="1" text="Детекторы" />
      <Loading<Camera[]> data={data} error={error}>
        {(data) =>
          !data || data.length === 0 ? (
            <NotFound text="Список камер пуст" />
          ) : (
            <CamerasList cameras={data} />
          )
        }
      </Loading>
    </Layout>
  );
}
