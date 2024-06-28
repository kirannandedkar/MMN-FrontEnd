"use client"

import { useRef, useState } from "react";
import { FamilyAccountInfo, Genders, Relationships } from "@/constants/types";
import FamilyInfoPane from './FamilyInfoPane'

import MMNButton from "@/components/MMNButton";
import MMNTitle from "@/components/MMNTItle";
import Modal from 'react-modal';

const customStyles = {
    content: { width: '60%', margin: 'auto', padding: '40px', height: 'max-content' },
    overlay: { zIndex: 1000 }
};

interface FamilyMemberModalProps {
    open: boolean
    onClose: () => void
    onSave: (memeber: FamilyAccountInfo) => void
}

export default function FamilyMemberModal({ open, onClose, onSave }: FamilyMemberModalProps) {
    Modal.setAppElement('#modal-container');

    const acocuntInfoPaneRef = useRef<any>(null);
    //invoked by calling handleDone function 
    const acoountReceived = (_member: FamilyAccountInfo | null) => {
        if(!_member) return;

        onSave(_member);
        onClose();
    }

    const handleDone = () => {
        if(acocuntInfoPaneRef.current) 
            acocuntInfoPaneRef.current.submit();
    }

    return (
        <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
            <div className="flex flex-col gap-[30px]">
                <div className="flex justify-between items-center">
                    <MMNTitle title="Add family members" color="purple" />
                    <div className="closeButton cursor-pointer" onClick={onClose}>
                        <img src="/xmark.circle.fill.svg" />
                    </div>
                </div>
                {/*<FamilyInfoPane onSubmit={acoountReceived} ref={acocuntInfoPaneRef} />*/}
                <div className="flex justify-end gap-[20px]">
                    <div onClick={onClose}>
                        <MMNButton title="Close" color="white" className={"border-[1px] border-color-mmn-purple"} />
                    </div>

                    <div onClick={handleDone}>
                        <MMNButton title="Done" color="purple" />
                    </div>
                </div>
            </div>
        </Modal>
    )
}