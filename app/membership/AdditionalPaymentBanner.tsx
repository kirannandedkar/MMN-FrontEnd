import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const AdditionalPaymentBanner: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeBanner = () => {
    setIsOpen(false);
  };

  const clickPaymentBtnHandler = () => {
      router.push('/auth/membership-details');
  }

  return (
    <>
      {isOpen && (
        <div className="bg-[#FF714D] text-white p-6 rounded-lg flex justify-between items-center relative">
          <div>
            <h2 className="text-2xl font-bold">Your Payment Due</h2>
            <p className="text-lg">Stay connected with us by subscribe your membership.</p>
          </div>
          <button
            onClick={closeBanner}
            className="absolute top-0 right-2 text-white text-2xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
          <button onClick={clickPaymentBtnHandler} className="bg-white text-blue-600 px-4 py-2 mt-5 rounded-lg font-semibold hover:bg-gray-200">
            Payment Now
          </button>
        
        </div>
      )}
    </>
  );
};

export default AdditionalPaymentBanner;
