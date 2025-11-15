import axios, {type AxiosResponse, HttpStatusCode} from 'axios';
import type {Errors} from "@/interfaces/errors.ts";

// --> константы
const HTTP_ERROR_DESCRIPTION: Partial<
  Record<HttpStatusCode,(service: string, method: string) => string>
> = {
  [HttpStatusCode.BadRequest]: (service: string, method: string) =>
    `Сервис ${service} усмехнулся и сказал, что метод ${method} не найден`,
  [HttpStatusCode.ServiceUnavailable]: (service: string) =>
    `У сервиса ${service} тихий час`,
  [HttpStatusCode.Conflict]: (service: string) =>
    `Сервис ${service} вызвал конфликт`,
}

//__ можно сделать константу для маршрутов (?)

async function getErrorFromData(response: AxiosResponse) {
  if (!response.data) {
    console.log('nothing :(');
    return;
  }

  console.log(response)

  let errorMessage = new Array<string>();

  const errorData = (response.data as Errors).errors;
  if (errorData) {
    for (const errorKey in errorData) {
      const errorValue = errorData[errorKey];
      errorMessage = errorMessage.concat(errorValue);
    }
    return errorMessage;
  }

  console.log("другие методы обработки ошибок,", response.data)

}

export async function getError(
  response: AxiosResponse,
  message: string[],
  service: string
): Promise<string[]> {

  const responseMethod = response.config?.method || ''; // --> имя метода

  const errorMessage = await getErrorFromData(response);
  if (errorMessage) {
    return errorMessage;
  }

  // --> поиск кода ошибки в списке статусов
  const getErrorStatusDescription = HTTP_ERROR_DESCRIPTION[response.status as HttpStatusCode];
  if (getErrorStatusDescription) {
    return [getErrorStatusDescription(service, responseMethod)];
  }

  return [
    `Метод ${responseMethod} сервиса ${service} выпал в ошибку: ${message}`,
  ]
}
