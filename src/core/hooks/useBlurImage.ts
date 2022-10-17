import { buildUrl } from "cloudinary-build-url";
import { useMemo } from "react";

type IUseBlurImageOptions = {
  width?: number;
};

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const useBlurImage = (
  imageUrl: string | undefined,
  { width }: IUseBlurImageOptions
) => {
  const originalUrl = useMemo(() => {
    if (!imageUrl) return "";
    return buildUrl(imageUrl, {
      cloud: {
        cloudName,
      },
      transformations: {
        ...(width && {
          resize: {
            width,
          },
        }),
        quality: 100,
      },
    });
  }, [imageUrl, width]);

  const blurUrl = useMemo(() => {
    if (!imageUrl) return "";
    return buildUrl(imageUrl, {
      cloud: {
        cloudName,
      },
      transformations: {
        effect: {
          name: "blur",
          value: 1000,
        },
        quality: 1,
        ...(width && {
          resize: {
            width,
          },
        }),
      },
    });
  }, [width, imageUrl]);

  return { originalUrl, blurUrl };
};
export default useBlurImage;
