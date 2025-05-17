"use client"
import { useState } from "react";

import DropzoneUploader from "@/components/dropzone/dropzone-uploader";
import { UploaderSection } from "./uploader-section";

export const Content = () => {

  const [file, setFile] = useState<File | null>(null)
  const [watermark, setWatermark] = useState<File | null | string>(null)

  console.log(file, 'file')

  return (
    <DropzoneUploader file={file} setFile={setFile}>
      <UploaderSection 
        file={file}
        setFile={setFile}
        watermark={watermark}
        setWatermark={setWatermark}
      />
      <div className="mx-40 mt-5">
        <span className="flex w-full items-center justify-center">
          This project is developed with the purpose of assignment submission for cloud computing@2025 course from Leiden University.
        </span>
      </div>
    </DropzoneUploader>
  )
}