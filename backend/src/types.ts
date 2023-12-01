import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
  };
}

export type Advertisement = {
  adId: number;
  userId: number;
  payout: number;
  payoutType: string;
  city: string;
  type: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
};
