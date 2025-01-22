'use client';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import InfoPage from './InfoPage';
import { InfoModalProps } from '@/lib/types/types';



const InfoModal = ({ isOpen, onClose }: InfoModalProps) => {
    if (!isOpen) return null;

    // Prevent click propagation when clicking inside modal content
    // const handleContentClick = (e: React.MouseEvent) => {
    //     e.stopPropagation();
    // };
    return (
        <div className="modal modal-open">
            {/* Modal backdrop - automatikusan kezeli a bezárást */}
            <div className="modal-box relative max-w-2xl">
                {/* Bezáró gomb */}
                <button
                    className="btn btn-sm btn-circle absolute left-2 top-2"
                    onClick={onClose}
                >
                    <ArrowLeft className="" />
                </button>

                <InfoPage />

            </div>
        </div>
    );
};

export default InfoModal;