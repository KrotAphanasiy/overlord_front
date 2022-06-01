import Axios from "axios";
import { toast } from "react-toastify";

const http = Axios.create();

http.interceptors.response.use(
  (successResponse) => {
    return successResponse;
  },
  (errorResponse) => {
    toast.error(errorResponse?.data?.message ?? errorResponse.message);
    return Promise.reject(errorResponse);
  }
);

export default http;
