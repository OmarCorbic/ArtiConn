import { Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import query from "../db";
import { AuthRequest } from "../types";

const authorizeUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("You are not logged in");
  }

  const accessToken = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    );
    const result: any = await query(
      "SELECT userId FROM users WHERE userId=? ",
      [decoded?.userId]
    );

    if (result.length < 1) {
      throw new UnauthorizedError("User does not exist");
    }
    req.user = { userId: result[0].userId };
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid authorization credentials");
  }
};

export default authorizeUser;
