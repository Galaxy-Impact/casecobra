import sharp from "sharp";
import { catchAsync } from "@/utils/catchAsync";
import AppError from "@/utils/appError";
import { db } from "@/app";

const validImages = ["jpeg", "png", "jpg"];

const isValidImage = (imageUrl: string) => {
  const arr = imageUrl.split(".");
  const lastIndex = arr.length - 1;
  return validImages.includes(arr[lastIndex]!);
};

const calcImageDimension = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    const imgMetadata = await sharp(buffer).metadata();
    const { width, height } = imgMetadata;

    return { width, height };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createConfiguration = catchAsync(async (req, res, next) => {
  const { imageUrl, color, model, finish, material, croppedImageUrl } =
    req.body;

  if (!isValidImage(imageUrl))
    return next(new AppError("Please provide valid image", 400));

  const { width, height } = await calcImageDimension(imageUrl);

  const configuration = await db.configuration.create({
    data: {
      imageUrl,
      height: height || 500,
      width: width || 500,
      color,
      model,
      finish,
      material,
      croppedImageUrl,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      configuration,
    },
  });
});

export const getConfigurationById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("id not found!", 404));

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      configuration,
    },
  });
});

export const updateConfiguration = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { croppedImageUrl, finish, material, model, color } = req.body;

  if (!id) return next(new AppError("Id not found!", 404));

  const configuration = await db.configuration.update({
    where: {
      id,
    },
    data: {
      croppedImageUrl,
      finish,
      material,
      model,
      color,
    },
  });

  res.status(200).json({
    status: "success",
    data: {
      configuration,
    },
  });
});
