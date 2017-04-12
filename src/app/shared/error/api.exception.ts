export class ApiException {
  requestId: number;
  errorCode: number;
  errorMsg: string;

  constructor(requestId:number, errorCode: number, errorMsg: string) {
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.errorMsg = errorMsg;
  }
}
