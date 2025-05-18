"use client"

import Image from "next/image"
import { UploadCloudIcon, XIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useRef } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

interface UploaderSectionProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  watermark: File | null | string;
  setWatermark: Dispatch<SetStateAction<File | null |string>>;
}

export const UploaderSection = ({
  file,
  setFile,
  watermark,
  setWatermark
}: UploaderSectionProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const watermarkRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  const handleWMChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setWatermark(selectedFile);
    } else {
      setWatermark(e.target.value)
    }
  }

  console.log(watermark,'watermark')

  return (
    <div className="mx-40 mt-10 h-110 bg-red-100 rounded-2xl relative">
      <div className="relative w-full h-full">
        <div className="top-5 left-5 absolute">
          <Image 
            src={"/pic1.jpg"}
            alt="home1"
            width={250}
            height={360}
          />
        </div>
        <div className="right-5 bottom-5 absolute">
          <Image 
            src={"/pic2.jpeg"}
            alt="home1"
            width={250}
            height={360}
          />
        </div>
      </div>  
      <div className="absolute bg-[hsla(0,0%,100%,.8)] top-[20%] mx-[20%] p-6 rounded-2xl">
        <div className="flex flex-col gap-y-6 text-center justify-center px-20">
          <h1 className="text-3xl font-bold">
            Watermark your videos
          </h1>
          <span className="text-muted-foreground text-sm">
            Make sure your content is truely yours when you this free application and easy to use watermarking service. From your personal social media reels to branded ads, see to it you get credit for your 
            creative work by placing logos, text or video watermarks.
          </span>
          <div className="flex flex-col gap-y-3 items-center justify-center w-full">
            <input ref={inputRef} type="file" onChange={handleChange} className="hidden" />
            <input ref={watermarkRef} type="file" onChange={handleWMChange} className="hidden" />
            {
              file ? 
              (
                <>
                  <div>{file?.name || "Your video is uploaded"}</div>
                  <div className="flex flex-row gap-x-2 items-center justify-center">
                    watermark
                    <Button
                      className="flex gap-x-2 justify-center items-center"
                      size="icon"
                      onClick={() => {
                        watermarkRef.current?.click()
                      }}
                    >
                      <UploadCloudIcon className="size-4 text-white"/>
                    </Button>
                    {watermark instanceof File ? (
                      <div className="flex flex-row gap-x-2 text-center items-center">
                        {watermark instanceof File ? watermark?.name : "uploaded"} 
                        <XIcon className="size-3 text-red-500 cursor-pointer" onClick={() => setWatermark(null)}/>
                      </div>
                    ) : 
                      <Input
                        type="text"
                        placeholder="Your online url here .."
                        onChange={handleWMChange}
                      />
                    }
                  </div>
                </>
              ) :
              <>
                <Button
                className="flex gap-x-2 justify-center items-center"
                size="sm"
                onClick={() => {
                  inputRef.current?.click()
                }}
                >
                  <UploadCloudIcon className="size-4 text-white"/>Upload your video
                </Button>
                <span className="text-muted-foreground text-sm">or drop it here</span>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}