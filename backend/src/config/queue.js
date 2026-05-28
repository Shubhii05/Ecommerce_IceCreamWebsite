import { Queue } from "bullmq";
import Redis from "ioredis";

// We need a standard `rediss://` connection string for BullMQ.
// The current process.env.REDIS_URL is a REST API (https://) which crashes ioredis.
// Please update REDIS_URL to the standard Redis connection string from Upstash.
export let queueConnection;
if (process.env.REDIS_URL && process.env.REDIS_URL.startsWith("redis")) {
  queueConnection = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null,
  });
}

export const orderQueue = queueConnection ? new Queue("orderQueue", { connection: queueConnection }) : null;
