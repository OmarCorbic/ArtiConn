import { Response, Request } from "express";
import query from "../db";
import bcrypt from "bcrypt";
import { BadRequestError, CustomAPIError, UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer";
import redis from "../redis";
import { generateRandomCode } from "../utils/generateRandomCode";

export const register = async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    biography,
    phoneNumber,
    skills,
    verificationCode,
  } = req.body;

  if (!password || !username || !email) {
    throw new BadRequestError("Please provide all required fields");
  }

  if (password.length <= 8) {
    throw new BadRequestError("Password must be longer than 8 characters");
  }

  let skillsStr;
  if (skills.length > 0) {
    // check if are skills are valid in table skills
    skillsStr = skills.join(" ");
  }

  const correctCode = await redis.get(email);
  if (!correctCode || correctCode !== verificationCode) {
    throw new CustomAPIError("Invalid code");
  }

  await redis.del(email);

  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);

  await query(
    "INSERT INTO users (email, password, username, biography, phoneNumber, skills) VALUES (?, ?, ?, ?, ?, ?)",
    [
      email || null,
      hashedPw || null,
      username || null,
      biography || null,
      phoneNumber || null,
      skillsStr || null,
    ]
  );

  res.status(StatusCodes.CREATED).json({ message: "Successfully registered" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const result: any = await query(
    "SELECT userId, email, password FROM users WHERE email=?",
    [email]
  );

  if (result.length < 1) {
    throw new BadRequestError("User with that e-mail does not exist");
  }
  const user = result[0];

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Incorrect password");
  }

  const userInfo: { userId: number } = {
    userId: user.userId,
  };

  const accessToken = jwt.sign(userInfo, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME!,
  });

  const refreshToken = jwt.sign(
    userInfo,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME! }
  );

  if (!accessToken || !refreshToken) {
    throw new Error("Could not sign the token");
  }

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 60 * 60 * 60 * 1000, // 10 min
  });

  res
    .status(StatusCodes.OK)
    .json({ message: "Successfully logged in", accessToken });
};

export const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) throw new UnauthorizedError("You are not logged in");
  const refreshToken = cookies.jwt;

  try {
    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    );

    const result: any = await query(
      "SELECT userId FROM users WHERE userId=? ",
      [decoded?.userId]
    );

    if (result.length < 1) {
      throw new UnauthorizedError("User does not exist");
    }

    const userInfo: { userId: number } = {
      userId: result[0].userId,
    };

    const accessToken = jwt.sign(
      userInfo,
      process.env.JWT_ACCESS_TOKEN_SECRET!,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME!,
      }
    );
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    throw new UnauthorizedError("Invalid authorization credentials");
  }
};

export const logout = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) throw new BadRequestError("You are not logged in");
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "none" });
  res.json({ message: "Cookie cleared" });
};

export const sendVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("E-mail is missing");
  }

  const code = generateRandomCode();

  const transporter = nodemailer.createTransport(
    `smtps://${process.env.EMAIL_USER}:${process.env.EMAIL_KEY}@smtp.gmail.com`
  );

  const mailOptions = {
    sender: process.env.EMAIL_USER,
    to: email,
    subject: "Verification code",
    html: `<html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <title>Verification code</title>
    </head>
    <body>
      <h3>Hello! </h3>
      <p>Your 6 digit verification code is: </p>
      <h2>${code}</h2>
    </body>
  </html>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);

    console.log(JSON.stringify(result.envelope));

    // save user code
    await redis.set(email, code);
    // set delete timeout
    setTimeout(async () => {
      await redis.del(email);
      console.log("CODE FOR ", email, "DELETED");
    }, 10 * 60000);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Verification code is sent" });
  } catch (error) {
    console.log(error);
    throw Error();
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  if (!email) {
    throw new BadRequestError("E-mail is missing");
  }
  if (!code) {
    throw new BadRequestError("Code is missing");
  }

  const correctCode = await redis.get(email);
  if (!correctCode || correctCode != code) {
    throw new CustomAPIError("Invalid code");
  }

  await redis.del(email);
  res.status(StatusCodes.OK).json({ message: "Verification successful" });
};
