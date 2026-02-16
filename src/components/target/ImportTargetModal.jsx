import React, { useState, useRef } from 'react'
import Modal from '../Modal'
import Button from '../Button'
import Text from '../Text'
import { FiUpload, FiFile, FiX } from 'react-icons/fi'

export default function ImportTargetModal({ isOpen, onClose, onImport }) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [isDragging, setIsDragging] = useState(false)
    const [error, setError] = useState('')
    const fileInputRef = useRef(null)

    const handleClose = () => {
        setSelectedFile(null)
        setError('')
        setIsDragging(false)
        onClose()
    }

    const validateFile = (file) => {
        const validTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv'
        ]
        const validExtensions = ['.xlsx', '.xls', '.csv']

        const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))

        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
            setError('Please upload a valid Excel (.xlsx, .xls) or CSV file')
            return false
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be less than 10MB')
            return false
        }

        setError('')
        return true
    }

    const handleFileSelect = (file) => {
        if (validateFile(file)) {
            setSelectedFile(file)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const file = e.dataTransfer.files?.[0]
        if (file) {
            handleFileSelect(file)
        }
    }

    const handleImport = async () => {
        if (!selectedFile) {
            setError('Please select a file to import')
            return
        }

        try {
            const formData = new FormData()
            formData.append('file', selectedFile)

            if (onImport) {
                await onImport(formData, selectedFile)
            }

            handleClose()
        } catch (err) {
            setError(err.message || 'Failed to import file')
        }
    }

    const handleRemoveFile = () => {
        setSelectedFile(null)
        setError('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Import Target"
            width="max-w-lg"
        >
            <div className="flex flex-col gap-2">
                <div className='flex flex-col gap-2'>
                    <Text>
                        Please input using this template: <a href="/sample-data.xlsx" download="Template.xlsx" className='border-b border-b-[#0B8E39] text-[#0B8E39] cursor-pointer'>Template.xlsx</a>
                    </Text>
                    <Text>Then upload document with the data here:</Text>
                </div>
                <div
                    className={`
                        relative border border-dashed p-8 text-center cursor-pointer
                        transition-all duration-200 mb-3
                        ${isDragging
                            ? 'border-[#00FF62] bg-[#00FF62]/10'
                            : 'border-white hover:border-[#00FF62]/50 hover:bg-white/5'
                        }
                    `}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {!selectedFile ? (
                        <div className="flex flex-col items-center gap-3">
                            <FiUpload className="text-[#00FF62]" size={48} />
                            <div className="flex flex-col gap-1">
                                <p className="text-white font-semibold">
                                    Drop your file here or click to browse
                                </p>
                                <p className="text-white/60 text-sm">
                                    Supported formats: Excel (.xlsx, .xls) or CSV
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                <FiFile className="text-[#00FF62]" size={24} />
                                <div className="text-left">
                                    <p className="text-white font-semibold text-sm">
                                        {selectedFile.name}
                                    </p>
                                    <p className="text-white/60 text-xs">
                                        {formatFileSize(selectedFile.size)}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveFile()
                                }}
                                className="text-[#8E0B0B] hover:text-[#8E0B0B]/80 transition-colors"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="bg-[#8E0B0B]/20 border border-[#8E0B0B] rounded-lg p-3">
                        <p className="text-[#FF6B6B] text-sm">{error}</p>
                    </div>
                )}

                <div className="flex justify-center gap-3 w-full">
                    <Button
                        className="w-full flex items-center justify-center"
                        type="button"
                        onClick={handleImport}
                        disabled={!selectedFile}
                    >
                        <Text className='uppercase'>
                            Import
                        </Text>
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
