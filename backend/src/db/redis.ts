import { createClient } from "redis";
import { conf } from "../config";

const redisConnection = async () => {
  const client = await createClient({
    url: `redis://@${conf.redis.host}:${conf.redis.port}`,
  })
  .on('error', (error) => {
    console.error('Could not connect to Redis.', error);
  }).connect();
  
  console.log("[server]: Redis connected!")
  return client;
}

export { redisConnection }