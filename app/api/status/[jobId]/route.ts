import type { NextApiRequest, NextApiResponse } from "next";
import { getJobById } from "@/lib/job-service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { jobId } = req.query;
  const job = await getJobById(jobId as string);

  if (!job) return res.status(404).json({ error: "Job not found" });

  return res.status(200).json(job);
}
