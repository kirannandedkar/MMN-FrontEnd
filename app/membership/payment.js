import React from "react";

const payment = () => {
  return (
    <div className="max-w-[420px] w-full h-[190px] bg-[#FF5733] rounded-[10px] p-6 flex flex-col gap-[14px]">
      <h2 className="font-poppins font-[600] text-[24px] leading-9 text-white">
        Total Payment
      </h2>
      <div className="flex">
        <span className="basis-1/2 font-poppins font-[500] text-[14px] leading-7 text-white">
          Total
        </span>
        <span className="basis-1/2 font-poppins font-[700] text-[18px] leading-7 text-white">
          Kr 160
        </span>
      </div>
      <button className="font-poppins font-[600] text-[16px] leading-6 text-[#00205B] max-w-[185px] w-full h-[50px] px-5 self-end bg-white rounded-[6px]">
        Proceed payment
      </button>
    </div>
  );
};

export default payment;
