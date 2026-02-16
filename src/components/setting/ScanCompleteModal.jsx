import React from 'react'
import Modal from '../Modal'
import Text from '../Text'
import Button from '../Button'
import { FaCheckCircle } from 'react-icons/fa'

export default function ScanCompleteModal({
    isOpen,
    onClose,
    totalResults = 0
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Scan Complete"
            width="max-w-lg"
            type="none"
        >
            <div className="flex flex-col items-center gap-6 py-4">
                <div className="flex items-center justify-center">
                    <FaCheckCircle className="text-[#00FF62]" size={64} />
                </div>

                <div className="text-center">
                    <Text size="18px" family="oxanium" className="font-bold mb-2">
                        Scanning Process Completed Successfully
                    </Text>
                    <Text size="14px" family="sora" className="text-white/70">
                        All devices have been scanned and results are ready
                    </Text>
                </div>

                <div className="w-full grid grid-cols-1 gap-4">
                    <div className="flex flex-col items-center p-4 bg-[#0B2816] rounded border border-[#174828]">
                        <Text size="24px" family="chakra" className="font-bold text-[#00FF62]">
                            {totalResults}
                        </Text>
                        <Text size="12px" family="sora" className="text-white/60 mt-1">
                            Total Results
                        </Text>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
