"use client";
import React from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";

import { AspectRatio, cn } from "@casecobra/ui";
import HandleComponent from "./HandleComponent";
import type {
  RenderedDimensions,
  RenderedPosition,
} from "./DesignConfigurator";

interface ImageAdjusterProps {
  imageUrl: string;
  color: string;
  renderedPosition: RenderedPosition;
  setRenderedPosition: React.Dispatch<React.SetStateAction<RenderedPosition>>;
  renderedDimensions: RenderedDimensions;
  setRenderedDimensions: React.Dispatch<
    React.SetStateAction<RenderedDimensions>
  >;
}

const ImageAdjuster = React.forwardRef<HTMLDivElement, ImageAdjusterProps>(
  (
    {
      color,
      imageUrl,
      setRenderedDimensions,
      renderedDimensions,
      renderedPosition,
      setRenderedPosition,
    },
    ref
  ) => {
    return (
      <>
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={ref}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <Image
              fill
              alt="phone image"
              src="/phone-template.png"
              className="pointer-events-none z-50 select-none"
            />
          </AspectRatio>
          <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              color
            )}
          />
        </div>

        <Rnd
          default={{
            x: renderedPosition.x,
            y: renderedPosition.y,
            width: renderedDimensions.width,
            height: renderedDimensions.height,
          }}
          lockAspectRatio
          className="absolute z-20 border-[3px] border-primary"
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
          onDragStop={(_, { x, y }) => {
            setRenderedPosition({
              x,
              y,
            });
          }}
          onResizeStop={(_, __, el, ___, { x, y }) => {
            const { width, height } = el.getBoundingClientRect();
            setRenderedDimensions({
              width,
              height,
            });
            setRenderedPosition({ x, y });
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              fill
              sizes="100vw"
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </>
    );
  }
);

ImageAdjuster.displayName = "ImageAdjuster";

export default ImageAdjuster;
