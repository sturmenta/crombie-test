export const calculateSizeForAsset = ({
  containerMaxDimensions,
  assetMaxDimensions,
}: {
  containerMaxDimensions: { width: number; height: number };
  assetMaxDimensions: { width: number; height: number };
}) => {
  const animationDynamicWidth = containerMaxDimensions.width * 0.8;

  if (animationDynamicWidth > assetMaxDimensions.width) {
    return {
      width: assetMaxDimensions.width,
      height: assetMaxDimensions.height,
    };
  }

  return {
    width: animationDynamicWidth,
    height:
      (animationDynamicWidth * assetMaxDimensions.height) /
      assetMaxDimensions.width,
  };
};
