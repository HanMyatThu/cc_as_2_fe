"use client";

import { UploadCloudIcon } from "lucide-react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneUploaderProps {
  children: React.ReactNode;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

export default function DropzoneUploader({ 
  children,
  file,
  setFile
}: DropzoneUploaderProps) {

  // get file
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
    }
  }, [setFile]);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="relative flex-1">
      {/* <input {...getInputProps()} /> */}
      {children}
      {isDragActive && (
        <div className="h-full w-full z-5 bg-background absolute top-0 left-0">
          <div className="flex items-center justify-center h-full w-full flex-col gap-y-2">
            <UploadCloudIcon />
            <span className="text-lg font-semibold"> Drop a video file to upload </span>
          </div>
        </div>
      )}
    </div>
  );
}
