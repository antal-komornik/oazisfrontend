'use client';
import React from 'react';
import { X } from 'lucide-react';
import InfoPage from './InfoPage';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LocationModal = ({ isOpen, onClose }: LocationModalProps) => {
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
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                    onClick={onClose}
                >
                    <X className="w-4 h-4" />
                </button>

                <InfoPage />

            </div>
        </div>
    );
};

export default LocationModal;