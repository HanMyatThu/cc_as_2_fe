// pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

import { uploadToBlob } from "@/lib/blob-service";
import { createJobEntry } from "@/lib/job-service";
import { sendJobMessage } from "@/lib/queue-service";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.video || !files.watermark) {
      return res.status(400).json({ error: "Missing video or watermark file" });
    }

    const video = Array.isArray(files.video) ? files.video[0] : files.video;
    const watermark = Array.isArray(files.watermark) ? files.watermark[0] : files.watermark;

    const videoUrl = await uploadToBlob(video.filepath, `videos/${video.originalFilename}`);
    const watermarkUrl = await uploadToBlob(watermark.filepath, `watermarks/${watermark.originalFilename}`);

    const job = await createJobEntry(videoUrl, watermarkUrl);
    await sendJobMessage(job);

    return res.status(200).json({ jobId: job.jobId });
  });
}
