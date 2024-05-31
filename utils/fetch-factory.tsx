export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const ajaxHeader = {
  "X-Requested-With": "XMLHttpRequest",
};
const jsonContentType = "application/json";
const jsonContentTypeHeader = {
  accept: jsonContentType,
  "content-type": jsonContentType,
  ...ajaxHeader,
};

const getOutput = async (response: Response) => {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes(jsonContentType)) {
    return response.json();
  }

  if (
    (contentType && contentType.includes("application/octet-stream")) ||
    contentType?.includes("image/svg+xml")
  ) {
    const fileName = response.headers.get("Filename");
    return { fileName: fileName, blob: await response.blob() };
  }

  return undefined;
};

const handleRedirect = async (response: Response) => {
  if (response.status === 302) {
    window.location.replace(response.headers.get("location") ?? "");
    return Promise.reject(response);
  }
  return Promise.resolve(response);
};

const fetchFactory = (method: HttpMethod) => {
  const getHeaders = ["POST", "PUT", "PATCH", "DELETE"].find(
    (x) => x === method
  )
    ? (isFormData: boolean) =>
        isFormData ? { ...ajaxHeader } : { ...jsonContentTypeHeader }
    : (isFormData: boolean) =>
        isFormData ? ajaxHeader : jsonContentTypeHeader;

  return async function fetch<TInput = any | FormData, TOutput = any>(
    path: string,
    input?: TInput
  ): Promise<TOutput> {
    const isFormData = input instanceof FormData;
    const response = await window
      .fetch(path, {
        method,
        body: isFormData ? input : JSON.stringify(input),
        headers: getHeaders(isFormData),
      })
      .then(handleRedirect);

    const output = await getOutput(response);
    return response.ok
      ? output
      : Promise.reject({
          response: {
            status: response.status,
            data:
              output ??
              (response.status === 401 ? undefined : await response.json()),
          },
        });
  };
};

export const get: <TOutput = any>(path: string) => Promise<TOutput> =
  fetchFactory("GET");
export const post = fetchFactory("POST");
export const put = fetchFactory("PUT");
export const patch = fetchFactory("PATCH");
export const del = fetchFactory("DELETE");
