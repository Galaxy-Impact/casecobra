"use server";

import { redirect } from "next/navigation";
import axios from "@/lib/axios";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  Configuration,
  PhoneModel,
} from "@/types";

export const createConfiguration = async ({
  imageUrl,
}: {
  imageUrl: string;
}) => {
  let configId;
  try {
    const { data } = await axios.post("/configure", { imageUrl });
    configId = data.data.configuration.id;
  } catch (error) {
    throw new Error("failed to create configuration");
  }

  redirect(`/configure/design?id=${configId}`);
};

export const getConfigurationById = async (
  id: string
): Promise<Configuration | null> => {
  try {
    const { data } = await axios.get(`/configure/${id}`);

    return data.data.configuration;
  } catch (error) {
    return null;
  }
};

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
  croppedImageUrl: string;
};

export const updateConfiguration = async ({
  color,
  configId,
  model,
  material,
  finish,
  croppedImageUrl,
}: SaveConfigArgs) => {
  const { data } = await axios.patch(`/configure/${configId}`, {
    color,
    model,
    material,
    finish,
    croppedImageUrl,
  });

  return data.data.configuration;
};
