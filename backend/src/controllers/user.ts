import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { minioClient } from "../minio";
import { AuthRequest } from "../types";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import sUUID from "short-uuid";
import query from "../db";
import { BucketItemStat } from "minio";
import { deleteFile } from "../utils/deleteFIle";

export const getUserInfo = async (req: AuthRequest, res: Response) => {
  const userId = req.params.id || req.user?.userId;
  const result: any = await query("SELECT * FROM users WHERE userId=?", [
    userId,
  ]);
  if (result.length < 1) throw new NotFoundError("User not found");

  const user = result[0];
  delete user.password;
  delete user.credits;

  res.json({ user });
};

export const uploadUserPhoto = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!req.file) {
    throw new BadRequestError("Photo not provided");
  }

  const { mimetype, size, path } = req.file;
  const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!path || !size || !mimetype || !allowedImageTypes.includes(mimetype)) {
    deleteFile(path);
    throw new BadRequestError("Invalid file");
  }

  if (size > 1000000) {
    deleteFile(path);
    throw new BadRequestError("Size of the photo must be under 1mb");
  }

  const result: any = await query("SELECT photoId FROM users WHERE userId=?", [
    userId,
  ]);

  if (result[0].photoId !== null) {
    const itemName = result[0].photoId;
    try {
      const stat: BucketItemStat = await minioClient?.statObject(
        "user-profile-photos",
        itemName
      );

      if (stat) {
        await minioClient?.removeObject("user-profile-photos", itemName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const photoId = sUUID.generate();
  await minioClient?.fPutObject("user-profile-photos", photoId, path);
  await query("UPDATE users SET photoId=? WHERE userId=?", [photoId, userId]);
  deleteFile(path);

  res.status(StatusCodes.CREATED).json({
    message: "Profile picture updated successfully",
  });
};

export const getUserPhoto = async (req: AuthRequest, res: Response) => {
  const userId = req.params.id || req.user?.userId;

  // get username and photo
  const result: any = await query(
    "SELECT username, photoId FROM users WHERE userId=?",
    [userId]
  );
  if (result.length < 1) throw new NotFoundError("User not found");

  const { username, photoId } = result[0];

  let temporaryUrl = null;
  if (photoId !== null) {
    try {
      temporaryUrl = await minioClient?.presignedGetObject(
        "user-profile-photos",
        photoId,
        24 * 60 * 60
      );
    } catch (error: any) {
      console.log(error.message || error.data.message);
    }
  }

  return res.status(StatusCodes.OK).json({ username, url: temporaryUrl });
};

export const editUserInfo = async (req: AuthRequest, res: Response) => {
  const { username, email, phoneNumber, biography, skills } = req.body;
  let fields = { username, email, phoneNumber, biography, skills };
  const userId = req.user?.userId;
  const paramsId = req.params.id;

  if (skills?.length < 1) {
    delete fields.skills;
  } else {
    const skillsStr = skills?.join(" ") || undefined;
    fields = { ...fields, skills: skillsStr };
  }

  if (userId !== Number(paramsId)) {
    throw new UnauthorizedError(
      "User does not have permission to edit this profile"
    );
  }

  const providedFields = Object.entries(fields).filter(
    ([_, value]: [string, any]) => value
  );

  if (providedFields.length < 1)
    return res.status(StatusCodes.NO_CONTENT).json();

  const fieldUpdates = providedFields.map(
    ([fieldName]: [string, any]) => `${fieldName} = ?`
  );
  const q = `UPDATE users SET ${fieldUpdates.join(",")} WHERE userId = ?`;

  const values = [...providedFields.map(([_, value]) => value), userId];
  const result: any = await query(q, values);

  if (result.affectedRows < 1) throw new NotFoundError("User not found");

  res.status(StatusCodes.OK).json({ message: "User updated successfully" });
};

export const changeUserPassword = async (req: AuthRequest, res: Response) => {
  const { currentPass, newPass, repeatPass } = req.body;
  const userId = req.user?.userId;

  if (newPass !== repeatPass) {
    throw new BadRequestError("New passwords do not match");
  }

  let result: any = await query("SELECT password FROM users WHERE userId=?", [
    userId,
  ]);
  if (result.affectedRows < 1) throw new NotFoundError("User not found");

  const isPasswordCorrect = await bcrypt.compare(
    currentPass,
    result[0].password
  );
  if (!isPasswordCorrect) {
    throw new BadRequestError("Incorrect current password");
  }

  const salt = await bcrypt.genSalt(10);
  const newHashedPass = await bcrypt.hash(newPass, salt);

  result = await query("UPDATE users SET password=? WHERE userId=?", [
    newHashedPass,
    userId,
  ]);

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Password changed successfully" });
};

export const getUserAds = async (req: AuthRequest, res: Response) => {
  const userId = req.params.id;

  const result: any = await query("SELECT * FROM ads WHERE userId=?", [userId]);

  res.json(result);
};
