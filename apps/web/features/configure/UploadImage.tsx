"use client";
import React, { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import {
  Image as ImageIcon,
  Loader2,
  MousePointerSquareDashed,
} from "lucide-react";
import { cn, Progress, toast } from "@casecobra/ui";
import { useUploadImage } from "@/hooks/useUploadImage";
import { createConfiguration } from "@/services/configure";

const UploadImage = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const { isUploading, startUpload, uploadProgress } = useUploadImage();

  const [isPending, startTransition] = useTransition();

  const onDropAccepted = async (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;
    if (!file) return;

    const imageUrl = await startUpload(file);
    startTransition(async () => {
      try {
        await createConfiguration({ imageUrl });
      } catch (error) {
        toast.error(`Failed to create configuration`);
      }
    });
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);
    if (!file) return;

    toast.error("Choose a PNG, JPG, or JPEG image");
  };

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-12 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
            >
              <input {...getInputProps()} multiple={false} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <ImageIcon className="xl:h-14 h-10  xl:w-14 w-10  text-zinc-500 mb-2" />
              )}

              <div className="flex flex-col items-center gap-1 justify-center mb-2 text-sm xl:text-lg lg:text-base text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}

                {isPending ? null : (
                  <p className="text-xs mt-1 text-zinc-500">PNG, JPG, JPEG</p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default UploadImage;
