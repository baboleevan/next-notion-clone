"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { ImagePlus, X } from "lucide-react";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageUpload = ({
  onChange,
  value,
  isOpen,
  onClose,
}: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  if (!isOpen) return null;

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      options={{
        maxFiles: 1,
      }}>
      {({ open }) => {
        return (
          <div
            className="z-[99999] my-4 mx-auto p-4 w-1/2 md:w-1/4 max-w-md bg-white rounded-lg border border-gray-200 shadow-md top-[20vh] md:left-[40%] left-[30%] fixed h-[300px]"
            onClick={(e) => e.stopPropagation()}>
            <div
              onClick={() => open()}
              className="mx-auto w-4/5 h-full flex flex-col items-center justify-center gap-4 transition border-2 border-dashed cursor-pointer z-20 hover:opacity-70 border-neutral-300 text-neutral-600">
              <ImagePlus size={50} />
              Click to Upload
            </div>

            <X
              color="gray"
              className="absolute -right-4 -top-4"
              onClick={() => onClose()}
              size={40}
            />

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  style={{ objectFit: "cover" }}
                  fill
                  src={value}
                  alt="Cover Image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
