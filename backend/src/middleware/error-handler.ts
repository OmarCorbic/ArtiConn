import { Response, Request, NextFunction } from "express";
import { CustomAPIError } from "../errors";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong. Please try again later",
  };

  if (err instanceof CustomAPIError) {
    customError.statusCode = err.statusCode;
    customError.message = err.message;
  }

  // if db field limits are exceeded
  if (err.code && err.code === "ER_DATA_TOO_LONG") {
    const columnNameMatch = err.sqlMessage.match(/'([^']*)'/);
    const columnName = columnNameMatch
      ? columnNameMatch[1].replace(/'/g, "")
      : null;

    console.error(`Data too long for column: ${columnName}`);
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `${columnName || "Data"} too long`;
  }

  // if required fields are not provided
  if (err.code && err.code === "ER_BAD_NULL_ERROR") {
    const columnNameMatch = err.sqlMessage.match(/'([^']*)'/);
    const columnName = columnNameMatch
      ? columnNameMatch[0].replace(/'/g, "")
      : null;

    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Please provide ${columnName || "all fields"}`;
  }

  // if there is no referenced record
  if (err.code && err.code === "ER_NO_REFERENCED_ROW") {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = "Record not found";
  }

  // if you try to add a record with existing (unique) field
  if (err.code && err.code === "ER_DUP_ENTRY") {
    const columnNameMatch = err.sqlMessage.match(/'(.*?)'/gi);
    const value = columnNameMatch?.at(0).replace(/'/g, "");
    const field = columnNameMatch?.at(1).replace(/'/g, "").split(".")[1];

    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message =
      value && field
        ? `User with ${field}: ${value} already exists`
        : "Duplicate entry";
  }

  // if validation check is violated
  if (err.code && err.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
    const checks: any = {
      users: {
        1: "password",
        2: "email",
      },
    };

    const checkMatch: any[] = err.sqlMessage?.match(/'(.*?)'/gi);
    let table: any = checkMatch?.at(0).replace(/'/g, "").split("_")[0];
    let check: any = Number(checkMatch?.at(0).replace(/'/g, "").split("_")[2]);
    if (isNaN(check)) {
      check = 0;
    }

    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `Invalid ${
      table && check && checks[table][check] ? checks[table][check] : "data"
    }`;
  }

  console.log(err.message);
  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandler;
