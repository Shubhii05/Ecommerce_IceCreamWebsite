import { Worker } from "bullmq";
import { queueConnection } from "../config/queue.js";

export const orderWorker = queueConnection ? new Worker(
  "orderQueue",
  async (job) => {
    const { userId, orderId } = job.data;
    
    console.log(`[Queue Worker] Processing order ${orderId} for user ${userId}...`);
    
    // Simulate heavy background work (e.g., generating PDF invoice, sending email)
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    console.log(`[Queue Worker] ✅ Successfully processed order ${orderId}. Receipt emailed to user!`);
  },
  { connection: queueConnection }
) : null;

if (orderWorker) {
  orderWorker.on("completed", (job) => {
    console.log(`[Queue Worker] Job ${job.id} completed.`);
  });

  orderWorker.on("failed", (job, err) => {
    console.error(`[Queue Worker] Job ${job?.id} failed: ${err.message}`);
  });
}
