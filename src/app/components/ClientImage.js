"use client";

import { CldImage } from 'next-cloudinary';

const ClientImage = ({ src, width, height, alt, transformations }) => {
  return (
    <CldImage 
      src={src}
      width={width}
      height={height}
      alt={alt}
      transformations={transformations}
    />
  );
};

export default ClientImage;
