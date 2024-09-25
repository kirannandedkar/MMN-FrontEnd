import React from "react";
import { IGallery } from "../types/Interfaces";
import { BsArrowLeft, BsArrowRight, BsXLg } from "react-icons/bs";

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  fileType: string;
  caption: string;
  thumbnails: IGallery[];
  currentImageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectThumbnail: (index: number) => void;
}

const ImagePopup: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  imageAlt,
  caption,
  fileType,
  thumbnails,
  currentImageIndex,
  onClose,
  onNext,
  onPrev,
  onSelectThumbnail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg overflow-hidden max-w-6xl w-full p-1">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 focus:outline-none z-50"
        >
         <BsXLg />
        </button>
        <div className="relative">
          {fileType === "Photos" ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
              style={{ maxHeight: "45rem" }}
            />
          ) : (
            <video controls className="w-full h-full object-cover">
              <source src={imageSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}

          <div className="absolute bottom-2 left-4 bg-red-600 text-white rounded p-2">
            {caption}
          </div>

          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 focus:outline-none"
          >
            <BsArrowLeft/>
          </button>
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 focus:outline-none"
          >
           <BsArrowRight/>
          </button>
        </div>

        <div className="flex overflow-x-auto p-2 space-x-2 bg-gray-100">
          {thumbnails.map((thumb, index) => {
            return thumb.fileType === 'Photos' ? (
              <img
              key={index}
              src={thumb.filePath}
              alt={thumb.eventName}
              className={`h-20 cursor-pointer object-cover rounded-sm ${
                index === currentImageIndex
                  ? "border-2 border-red-500 opacity-100"
                  : "border border-gray-300 opacity-80"
              }`}
              onClick={() => onSelectThumbnail(index)}
            />
            ) : (
              <video
              key={index}
              className={`h-20 cursor-pointer object-cover rounded-sm ${
                index === currentImageIndex
                  ? "border-2 border-red-500 opacity-100"
                  : "border border-gray-300 opacity-80"
              }`}
              src={thumb.filePath}
              controls={false}
              onClick={() => onSelectThumbnail(index)}
            ></video>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
