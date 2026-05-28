import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
// TEMP TEST — remove after confirming
(async () => {
  try {
    await redis.set("test", "ok");
    const val = await redis.get("test");
    console.log("Redis Connected ✅:", val);
    await redis.del("test"); // cleanup
  } catch (err) {
    console.error("Redis Error ❌", err.message);
  }
})();