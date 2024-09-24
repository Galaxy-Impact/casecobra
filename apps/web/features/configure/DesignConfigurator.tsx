"use client";
import React, { FC, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import ImageAdjuster from "./ImageAdjuster";
import CaseCustomizationOptions from "./CaseCustomizationOptions";
import { toast } from "@casecobra/ui";
import { useUploadImage } from "@/hooks/useUploadImage";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/utils/constants";
import { base64ToBlob } from "@/utils/helper";
import { updateConfiguration } from "@/services/configure";

interface DesignConfiguratorProps {
  configId: string;
  imageDimensions: {
    width: number;
    height: number;
  };
  imageUrl: string;
}

export type Options = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};

export type RenderedPosition = {
  x: number;
  y: number;
};

export type RenderedDimensions = {
  width: number;
  height: number;
};

const DesignConfigurator: FC<DesignConfiguratorProps> = ({
  configId,
  imageDimensions,
  imageUrl,
}) => {
  const [options, setOptions] = useState<Options>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const [renderedDimensions, setRenderedDimensions] =
    useState<RenderedDimensions>({
      width: imageDimensions.width / 4,
      height: imageDimensions.height / 4,
    });

  const [renderedPosition, setRenderedPosition] = useState<RenderedPosition>({
    x: 105,
    y: 200,
  });

  const { startUpload } = useUploadImage();

  const onContinue = () => {
    startTransition(async () => {
      try {
        if (!containerRef.current || !phoneCaseRef.current) return;
        const {
          width,
          height,
          top: caseTop,
          left: caseLeft,
        } = phoneCaseRef.current.getBoundingClientRect();
        const { top: containerTop, left: containerLeft } =
          containerRef.current.getBoundingClientRect();

        const offsetTop = caseTop - containerTop;
        const offsetLeft = caseLeft - containerLeft;

        const actualX = renderedPosition.x - offsetLeft;
        const actualY = renderedPosition.y - offsetTop;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        const userImage = new Image();
        userImage.crossOrigin = "anonymous";
        userImage.src = imageUrl;
        await new Promise((resolve) => (userImage.onload = resolve));

        ctx?.drawImage(
          userImage,
          actualX,
          actualY,
          renderedDimensions.width,
          renderedDimensions.height
        );

        const base64 = canvas.toDataURL();
        const base64Data = base64.split(",")[1];

        const blob = base64ToBlob(base64Data!, "image/png");
        const file = new File([blob], "filename.png", { type: "image/png" });
        const croppedImageUrl = await startUpload(file);

        await updateConfiguration({
          configId,
          croppedImageUrl,
          color: options.color.value,
          finish: options.finish.value,
          material: options.material.value,
          model: options.model.value,
        });

        router.push(`/configure/preview?id=${configId}`);
      } catch (error) {
        toast.error(
          "There was a problem saving your config, please try again."
        );
      }
    });
  };

  return (
    <div className="relative mt-12 grid grid-cols-1 lg:grid-cols-3 mb-16 pb-16">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <ImageAdjuster
          color={`bg-${options.color.tw}`}
          imageUrl={imageUrl}
          ref={phoneCaseRef}
          renderedPosition={renderedPosition}
          setRenderedPosition={setRenderedPosition}
          renderedDimensions={renderedDimensions}
          setRenderedDimensions={setRenderedDimensions}
        />
      </div>
      <CaseCustomizationOptions
        options={options}
        setOptions={setOptions}
        onContinue={onContinue}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DesignConfigurator;

// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
