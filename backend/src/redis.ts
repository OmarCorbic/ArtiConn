import { Redis } from "ioredis";

const redis = new Redis();

redis.on("error", (error) => {
  console.log("REDIS ERROR " + error);
});

redis.on("connect", () => {
  console.log("Connection to Redis established");
});

export default redis;
