import { Request, Response } from "express";

export const unhandledException = (req: Request, res: Response) => {
  return res.status(500).json({
    message: "Internal Server Error",
  });
};
