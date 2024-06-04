"use client"

import { useState } from "react";
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
    
    let member: FamilyAccountInfo | null = null;

    const setMember = (_member: FamilyAccountInfo | null) => {
        member = _member;
    }

    const handleDone = () => {
        if (!member) return;

        onSave(member);
        onClose();
        setMember(null);
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
                <FamilyInfoPane setMember={setMember}/>
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