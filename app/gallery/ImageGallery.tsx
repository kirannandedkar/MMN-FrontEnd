"use client"

import React, { useState } from 'react';
import Dropdown from './Dropdown';
import ImagePopup from './ImagePopup';

// Define the type for image objects
interface Image {
  src: string;
  alt: string;
  className: string;
  caption: string
}

// Array of images with defined types
const images: Image[] = [
  { src: '/image/gallery/1.png', alt: 'Event 1', className: 'col-span-2', caption: 'Event 1' },
  { src: '/image/gallery/2.png', alt: 'Event 2', className: 'col-span-1', caption: 'Event 2' },
  { src: '/image/gallery/3.png', alt: 'Event 3', className: 'col-span-3', caption: 'Event 3' },
  { src: '/image/gallery/4.png', alt: 'Event 4', className: 'col-span-2', caption: 'Event 1' },
  { src: '/image/gallery/5.png', alt: 'Event 5', className: 'col-span-1', caption: 'Event 4' },
  { src: '/image/gallery/6.png', alt: 'Event 6', className: 'col-span-5', caption: 'Event 5' },
  { src: '/image/gallery/7.png', alt: 'Event 7', className: 'col-span-2', caption: 'Event 6' },
  { src: '/image/gallery/8.png', alt: 'Event 8', className: 'col-span-4', caption: 'Event 7' },
  { src: '/image/gallery/9.png', alt: 'Event 9', className: 'col-span-4', caption: 'Event 8' },
];

// Define the options for years and events
const years: string[] = ['2021', '2022', '2023', '2024'];
const events: string[] = ['Event 1', 'Event 2', 'Event 3', 'Event 4'];

const ImageGallery: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('Select Year');
  const [selectedEvent, setSelectedEvent] = useState<string>('Select Event');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Handler for year selection
  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    // Implement year selection logic here
  };

  // Handler for event selection
  const handleEventSelect = (event: string) => {
    setSelectedEvent(event);
    // Implement event selection logic here
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const selectThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end gap-2 mb-4">
        <Dropdown label="Select Year" options={years} onSelect={handleYearSelect} />
        <Dropdown label="Select Event" options={events} onSelect={handleEventSelect} />
      </div>
      <div className="grid grid-cols-8 gap-1">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            style={{ height: '15rem' }}
            className={`object-cover w-full ${image.className}`}
            onClick={() => openModal(index)}
          />
        ))}
      </div>
      <ImagePopup
          isOpen={isModalOpen}
          imageSrc={images[currentImageIndex].src}
          imageAlt={images[currentImageIndex].alt}
          caption={images[currentImageIndex].caption}
          thumbnails={images}
          currentImageIndex={currentImageIndex}
          onClose={closeModal}
          onNext={showNextImage}
          onPrev={showPrevImage}
          onSelectThumbnail={selectThumbnail}
      />
    </div>
  );
};

export default ImageGallery;
