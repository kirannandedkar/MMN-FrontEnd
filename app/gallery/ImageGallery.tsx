"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ImagePopup from "./ImagePopup";
import { IGallery } from "../types/Interfaces";
import { GET } from "@/utils/fetch-factory";
import Loader from "@/components/Loader";
import { getCurrentYear, getYears } from "@/utils/funcs";
import { generateRandomNumbers } from "@/utils/gallery";


const events: string[] = ["Event 1", "Event 2", "Event 3", "Event 4"];

const ImageGallery: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear());
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [eventsName, setEventsName] = useState<string[]>([])
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([])
  const [files, setFiles] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEventsName()
    loadData(selectedYear, selectedEvent);
  }, []);

  const loadEventsName = async () => {
    const result = await GET(`/proxy/gallery/events`);
    setEventsName(result);
  }
  const loadData = async (year: number, event: string) => {
    const result = await GET(`/proxy/gallery?year=${year}&eventName=${event}`);
    setFiles(result);
    setRandomNumbers(generateRandomNumbers(result.length))
    setLoading(false);
  };
  const handleYearSelect = (year: number) => {
    setLoading(true);
    setSelectedYear(year);
    loadData(year, selectedEvent);
  };

  const handleEventSelect = (event: string) => {
    setLoading(true);
    setSelectedEvent(event);
    loadData(selectedYear, event);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + files.length) % files.length
    );
  };

  const selectThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end gap-2 mb-4">
        <Dropdown
          label={getCurrentYear()}
          options={getYears(2023)}
          onSelect={handleYearSelect}
        />
        <Dropdown
          label="Select Event"
          options={eventsName}
          onSelect={handleEventSelect}
        />
      </div>
      <div className="grid grid-cols-8 gap-1">
        {loading ? (
          <Loader />
        ) : (
          files.map((file, index) => (
            <div
              key={index}
              className={`w-full col-span-${randomNumbers[index]}`}
              style={{ height: "15rem" }}
              onClick={() => openModal(index)}
            >
              {file.fileType === "Photos" ? (
                <img
                  src={file.filePath}
                  alt={file.eventName}
                  className="object-cover w-full h-full"
                />
              ) : (
                <video controls={false} className="w-full h-full object-cover">
                  <source src={file.filePath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))
        )}
      </div>
      {!loading && files.length > 0 ? (
        <ImagePopup
          isOpen={isModalOpen}
          imageSrc={files[currentImageIndex].filePath}
          imageAlt={files[currentImageIndex].eventName}
          caption={files[currentImageIndex].eventName}
          thumbnails={files}
          fileType={files[currentImageIndex].fileType}
          currentImageIndex={currentImageIndex}
          onClose={closeModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
          onSelectThumbnail={selectThumbnail}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default ImageGallery;
