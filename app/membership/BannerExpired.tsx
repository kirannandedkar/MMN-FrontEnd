import React, { useState } from 'react';

const ExpiredBanner = ({ membershipName}: {membershipName: string})  => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const closeBanner = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="bg-[#FF714D] text-white p-6 rounded-lg flex justify-between items-center relative">
          <div>
            <h2 className="text-2xl font-bold">Your Membership</h2>
            <p className="text-lg">Stay connected with us by renewing your membership.</p>
          </div>
          <button
            onClick={closeBanner}
            className="absolute top-0 right-2 text-white text-2xl font-bold hover:text-gray-300"
          >
            &times;
          </button>
          <button className="bg-white text-blue-600 px-4 py-2 mt-5 rounded-lg font-semibold hover:bg-gray-200">
            Renew Membership
          </button>
        
        </div>
      )}
    </>
  );
};

export default ExpiredBanner;
