import React from "react";
import MMNTitle from "./MMNTItle";
import MMNButton from "./MMNButton";
import { ModalProps } from "../constants/types";

export const MMNModal: React.FC<ModalProps> = ({ title, children, showModal, onClose , onOk}) => {
    return (
        showModal ? 
        <div className={`p-[40px] rounded-[20px] min-h-1/2`}>
            <div className="flex flex-col gap-[30px]">
                <div className="flex justify-between">
                    <MMNTitle title={title} color="purple" />
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {children}

                <div className="flex gap-[20px] justify-end">
                    <div onClick={onClose}>
                        <MMNButton title="Close" color="white" />
                    </div>

                    <div onClick={onOk}>
                        <MMNButton title="Done" color="purple" />
                    </div>
                </div>
            </div>
        </div> : <></>
    );
};