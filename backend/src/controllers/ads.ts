import { Response } from "express";
import query from "../db";
import { NotFoundError, UnauthorizedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "../types";

export const getAllAds = async (req: AuthRequest, res: Response) => {
  const { limit, offset } = req.query;

  const result: any = await query(
    "SELECT *, DATE_FORMAT(date, '%Y-%m-%d') AS formatted_date FROM ads LIMIT ?, ?",
    [offset, limit]
  );

  res.json(result);
};

export const addAd = async (req: AuthRequest, res: Response) => {
  const { payout, payoutType, city, type, title, description, date } = req.body;
  const userId = req.user?.userId;
  const q =
    "INSERT INTO ads (userId, payout, payoutType, city, type, title, description, date) VALUES (?,?,?,?,?,?,?,?)";
  await query(q, [
    userId || null,
    payout || null,
    payoutType || null,
    city || null,
    type || null,
    title || null,
    description || null,
    date || null,
  ]);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Advertisement created successfully" });
};

export const editAd = async (req: AuthRequest, res: Response) => {
  const { payout, payoutType, city, title, description, date } = req.body;
  const fields = { payout, payoutType, city, title, description, date };
  const adId = Number(req.params.id);
  const userId = req.user?.userId;
  console.log(date);
  // check if ad exists
  let result: any = await query("SELECT userId FROM ads WHERE adId=?", [adId]);
  if (result.length < 1) throw new NotFoundError("Advertisement not found");

  // check if user has permission to edit
  const hasPermissionToEdit = result[0].userId === userId;
  if (!hasPermissionToEdit) {
    throw new UnauthorizedError(
      "User does not have permission to edit this ad"
    );
  }

  // remove fields with undefined or null value
  const providedFields = Object.entries(fields).filter(
    ([_, value]: [string, any]) => value
  );

  // check if there is any provided values
  if (providedFields.length < 1)
    return res.status(StatusCodes.NO_CONTENT).json();

  // construct update clauses
  const updateFields = providedFields
    .map(([fieldName]: [string, any]) => `${fieldName}=?`)
    .join(",");

  const values = [...providedFields.map(([_, value]) => value), adId, userId];

  result = await query(
    `UPDATE ads SET ${updateFields} WHERE adId=? AND userId=?`,
    values
  );

  res
    .status(StatusCodes.OK)
    .json({ message: "Advertisement updated successfully" });
};

export const deleteAd = async (req: AuthRequest, res: Response) => {
  const adId = req.params.id;
  // const userId = req.user?.userId;

  // let result: any = await query("SELECT userId FROM ads WHERE adId=?", [adId]);
  // const hasPermissionToEdit = result[0].userId === userId;
  // if (!hasPermissionToEdit) {
  //   throw new UnauthorizedError(
  //     "User does not have permission to delete this ad"
  //   );
  // }

  const result: any = await query("DELETE FROM ads WHERE adId=? ", [adId]);

  if (result.affectedRows < 1) {
    throw new NotFoundError("Record not found");
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Advertisement deleted successfully" });
};
