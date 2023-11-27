import axios, { AxiosError, AxiosResponse } from "axios";
// import { toast } from "react-toastify";

axios.defaults.baseURL =
  "https://run.mocky.io/v3/de18534a-5ddb-4a32-a7b3-e71910573d4f";
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
        console.log(data.title);
        // toast.error(data.title);
        break;
      case 401:
        console.log(data.title);
        // toast.error(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  get404Error: () => requests.get("buggy/not-found"),
  getValidationError: () => requests.get("buggy/validation-error"),
};

const DeviceCatalog = {
  list: () => requests.get("devices"),
};

const agent = {
  DeviceCatalog,
  TestErrors,
};

export default agent;