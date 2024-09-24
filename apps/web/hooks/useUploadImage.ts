import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

export const useUploadImage = () => {
  const { edgestore } = useEdgeStore();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = async (file: File) => {
    setIsUploading(true);
    const res = await edgestore.publicFiles.upload({
      file,
      onProgressChange: (progress) => {
        setUploadProgress(progress);
      },
    });
    setIsUploading(false);
    return res.url;
  };

  return { startUpload, uploadProgress, isUploading };
};
