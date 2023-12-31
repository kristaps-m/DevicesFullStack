import IOneDevice from "@/app/Models/OneDevice";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:5000/api/devices/";
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as any;

    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        console.error(data.title);
        break;
      case 401:
        console.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  addDevice: (url: string, device: IOneDevice) =>
    axios.post(url, device).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  put: (url: string, device: IOneDevice) =>
    axios.put(url, device).then(responseBody),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const DeviceCatalog = {
  list: () => requests.get("get-all"),
  addDevice: (oneDevice: IOneDevice) => requests.addDevice("add", oneDevice),
  removeDevice: (id: number) => requests.delete(`${id}`),
  updateDevice: (oneDevice: IOneDevice) => requests.put("update", oneDevice),
  getObjectsFiltered: (searchValue: string, isOnline: boolean) =>
    requests.get(
      `get-all-filtered?searchValue=${searchValue}&isOnline=${isOnline}`
    ),
};

const Agent = {
  DeviceCatalog,
  TestErrors,
};

export default Agent;
