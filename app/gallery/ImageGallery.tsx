"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ImagePopup from "./ImagePopup";
import { IGallery } from "../types/Interfaces";
import { GET } from "@/utils/fetch-factory";
import Loader from "@/components/Loader";
import {
  getCurrentYear,
  getYears,
  groupBy,
} from "@/utils/funcs";

const events: string[] = ["Event 1", "Event 2", "Event 3", "Event 4"];

const ImageGallery: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(getCurrentYear());
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [eventsName, setEventsName] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [files, setFiles] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEventsName();
    loadData(selectedYear, selectedEvent);
  }, []);


  const loadEventsName = async () => {
    const result = await GET(`/proxy/gallery/events`);
    setEventsName(result);
  };
  const loadData = async (year: number, event: string) => {
    const result = await GET(`/proxy/gallery?year=${year}&eventName=${event}`);
    const yearBasedGroup = groupBy(result, 'year');
    setFiles(result);
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
    <div>
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

      {loading ? (
        <Loader />
      ) : files.length > 0 ? (
        <div className="relative">
          <div className="absolute left-10 transform -translate-y-1/2 bg-[#FF5733] text-white py-4 px-4 rounded-r-lg" style={{top: '10%'}}>
            <span>Year {files[0].year}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {files.map((file, index) => {
              return file.fileType === "Photos" ? (
                <img
                  src={file.filePath}
                  alt={file.eventName}
                  className="object-fit"
                  onClick={() => openModal(index)}
                  style={{ height: "200px", maxWidth: '20%' }}
                />
              ) : (
                <div className="relative" style={{ maxWidth: '25%' }} key={index}>
          <video
            controls={false}
            className="object-fit"
            style={{ height: "200px", width: "100%" }}
            onClick={() => openModal(index)}
          >
            <source src={file.filePath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play Button Overlay */}
          <div
            className="absolute inset-0 flex justify-center items-center cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-[#ffffff]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-6.484-3.846A1 1 0 007 8.132v7.736a1 1 0 001.268.964l6.484-3.846a1 1 0 000-1.732z" />
              </svg>
            </div>
          </div>
        </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>No files available.</p>
      )}

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
