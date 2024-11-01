export class ResponseDto<T> {
  message: string;
  status: boolean;
  data?: T;

  constructor(message: string, status: boolean, data?: T) {
    this.message = message;
    this.status = status;
    this.data = data;
  }
}
