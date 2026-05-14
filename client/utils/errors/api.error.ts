export class ApiError<T = unknown> extends Error {
  status: number;
  payload: T;

  constructor(message: string, status: number, payload: T) {
    super(message);

    this.status = status;
    this.payload = payload;
  }
}
