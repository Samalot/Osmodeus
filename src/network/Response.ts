import ResponseType from "./ResponseType";

class Response {
  data : any;
  status : ResponseType;
  message : string;

  constructor(data : any, status : ResponseType, message : string) {
    this.data = data;
    this.status = status;
    this.message = message;
  }
}

export default Response;