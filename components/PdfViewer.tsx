"use client"
import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Define the type for the component's props
interface ViewPDFProps {
  path: string;
}

const ViewPDF: React.FC<ViewPDFProps> = ({ path }) => {
  return (
    <div style={{ height: '750px' }}>
     <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js`}>
        <Viewer fileUrl={path} />
      </Worker>
    </div>
  );
};

export default ViewPDF;
