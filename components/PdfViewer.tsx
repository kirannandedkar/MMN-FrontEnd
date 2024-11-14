// import React, { useEffect, useState } from 'react';
// import { pdfToPages } from '@/utils/funcs'; // Assuming this is your helper file
// import HTMLFlipBook from 'react-pageflip'; // Ensure you are using the correct component import
// import Loader from './Loader';
// import { set } from 'lodash';

// interface FlipbookProps {
//   pdfFile: string;
// }

// const Flipbook: React.FC<FlipbookProps> = ({ pdfFile }) => {
//   const [pages, setPages] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const loadPdf = async () => {
//       try {
//         const pageImages = await pdfToPages(pdfFile);
//         const imageUrls = pageImages.map(page => page.url);
//         setPages(imageUrls);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error loading PDF:', error);
//       }
//     };

//     loadPdf();
//   }, [pdfFile]);

//   if(loading)
//     return <Loader/>
    
//   return (
//     <HTMLFlipBook
//     showCover={true}
//      size={'stretch'}
//       width={600}
//       height={800}>
//       {pages.map((url, index) => (
//         <div key={index} className="page">
//           <img src={url} alt={`Page ${index + 1}`} style={{ width: '100%' }} />
//         </div>
//       ))}
//     </HTMLFlipBook>
//   );
// };

// export default Flipbook;
