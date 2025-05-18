import clientPromise from "./db-service";
import { v4 as uuidv4 } from "uuid";

export async function createJobEntry(videoUrl: string, watermarkUrl: string) {
  const jobId = uuidv4();

  const job = {
    jobId,
    status: "queued",
    videoUrl,
    watermarkUrl,
    createdAt: new Date(),
  };

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  await db.collection("jobs").insertOne(job);

  return job;
}

export async function getJobById(jobId: string) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return await db.collection("jobs").findOne({ jobId });
}
