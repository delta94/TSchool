import { Request } from "express";

export const getJwtTokenFromHeader = (req: Request) => {
  return req.headers.authorization?.split(' ')[1];
}