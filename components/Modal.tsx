import React from 'react';

interface IProps {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({ isOpen, title, children, onClose }: IProps) => {
    return (
        <div
            id="default-modal"
            className={`${
                isOpen ? 'flex' : 'hidden'
            } fixed top-0 right-0 left-0 z-50 justify-center bg-gray-500 bg-opacity-75 transition-opacity items-center h-[calc(100%-1rem)] w-full max-h-full md:inset-0 overflow-x-hidden overflow-y-auto`}
            tabIndex={-1}
            aria-hidden={!isOpen}
            role="dialog"
            aria-labelledby="modal-title"
            aria-modal={isOpen}
        >
            <div className="relative w-full max-w-4xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-lg">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-2 border-b rounded-t">
                        <h3 className=" font-semibold text-gray-900" id="modal-title">
                            {title}
                        </h3>

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center "
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7L1 13"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Modal;
