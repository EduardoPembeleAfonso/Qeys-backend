import { HttpStatusCode } from "axios";

export type HttpResponse<T = any> =
  | HttpResponseType<T>
  | HttpResponseType<string>;

export class HttpResponseType<T = any> {
  status: number;

  data: T;

  headers?: Record<string, any>;

  constructor(input: HttpResponseType<T>) {
    Object.assign(this, input);
  }
}

export class HttpResponseTypeError<T = any> extends HttpResponseType<T> {
  constructor(input: HttpResponseTypeError<T>) {
    super(input);
  }
}

export class ErrorResponse extends HttpResponseTypeError {
  constructor(error: Error) {
    super({
      status: HttpStatusCode.InternalServerError,
      data: error.message,
    });
  }
}
export const errorResponse = (error: Error) => new ErrorResponse(error);

export class BadRequestResponse extends HttpResponseTypeError {
  constructor(message: string) {
    super({
      status: HttpStatusCode.BadRequest,
      data: message,
    });
  }
}

export const forbiddenResponse = (error: any) =>
  new HttpResponseType({
    status: HttpStatusCode.Forbidden,
    data: error.message,
  });

export const badRequestResponse = (data: { message: string }) =>
  new HttpResponseType({
    status: HttpStatusCode.BadRequest,
    data,
  });

export const successResponse = (data: any) =>
  new HttpResponseType({
    status: HttpStatusCode.Ok,
    data,
  });

export const successResponseCustom = (data: any, headers?: any) =>
  new HttpResponseType({
    status: HttpStatusCode.Ok,
    data,
    headers,
  });

export const noContentResponse = () =>
  new HttpResponseType({
    status: HttpStatusCode.NoContent,
    data: null,
  });

export class AcceptedResponse extends HttpResponseType {
  constructor(data: any) {
    super({
      status: HttpStatusCode.Accepted,
      data: data,
    });
  }
}
export const acceptedResponse = (data: any) => new AcceptedResponse(data);

export class CreatedResponse extends HttpResponseType {
  constructor(data: any) {
    super({
      status: HttpStatusCode.Created,
      data: data,
    });
  }
}
export const createdResponse = (data: any) => new CreatedResponse(data);

export const notAcceptableResponse = (data: any) =>
  new HttpResponseType({
    status: HttpStatusCode.NotAcceptable,
    data,
  });

export const unauthorized = (data: any) =>
  new HttpResponseType({
    status: HttpStatusCode.Unauthorized,
    data,
});