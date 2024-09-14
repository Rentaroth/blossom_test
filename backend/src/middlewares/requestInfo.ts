import { Request, Response } from "express";

const reqInfo = (req:Request, res:Response) => {
  console.log(req);
}