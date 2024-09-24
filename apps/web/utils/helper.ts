import { Metadata } from "next";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const base64ToBlob = (base64: string, mimeType: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export function constructMetadata({
  title = "CaseCobra",
  description = "Create custom high-quality phone cases in seconds",
  image = "/thumbnail.png",
  icons = {
    icon: {
      url: "/favicon.ico",
    },
  },
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: {
    icon: {
      url: string;
    };
  };
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "Sudeep Mahato",
    },
    icons,
    metadataBase: new URL("https://iphonecase.vercel.app/"),
  };
}
