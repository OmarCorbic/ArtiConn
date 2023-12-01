import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
