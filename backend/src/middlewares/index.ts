import { Request, Response } from "express";

const reqInfo = (req: Request, res: Response, next: any) => {
  console.log(JSON.stringify({ headers: req.rawHeaders, body: req.hostname }));
  return next();
};

export { reqInfo };
