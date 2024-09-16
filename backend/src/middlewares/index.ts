import { Request, Response } from "express";
import { redisConnection } from "../db/redis";

const reqInfo = (req:Request, res:Response, next:any) => {
  console.log(JSON.stringify({ headers: req.rawHeaders, body: req.hostname}));
  return next()
}

const cacheStep = async (req: Request, res: Response, next:any) => {
  const redis = await redisConnection();

  const cached = await redis.get(JSON.stringify(req.body))

  console.log(cached)
  if (cached) {
    return cached;
  }
  
  await redis.set('cacheBody', JSON.stringify(req.body))

  return next()
}

export { reqInfo, cacheStep }