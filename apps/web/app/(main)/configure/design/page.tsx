import React, { FC } from "react";
import { notFound } from "next/navigation";
import DesignConfigurator from "@/features/configure/DesignConfigurator";
import { getConfigurationById } from "@/services/configure";

interface DesignPageProps {
  searchParams: {
    [x: string]: string | string[] | undefined;
  };
}

const DesignPage: FC<DesignPageProps> = async ({ searchParams: { id } }) => {
  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await getConfigurationById(id);

  if (!configuration) {
    return notFound();
  }

  const { width, height, imageUrl } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default DesignPage;
