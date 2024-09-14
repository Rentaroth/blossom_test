import { Request, Response } from "express";

const reqInfo = (req:Request, res:Response, next:any) => {
  // console.log({ headers: req.rawHeaders, body: req.hostname});
  return next()
}

export { reqInfo }