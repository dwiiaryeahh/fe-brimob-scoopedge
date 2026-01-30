import { useEffect } from 'react'
import BaseCard from './BaseCard'
import { IoMdCloseCircle } from 'react-icons/io'

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-md",
    type = "form"
}) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            window.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                style={{ background: "rgba(13, 27, 18, 0.8)" }}
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className={`relative w-full ${width} z-1000 scale-100 opacity-100 transition-all duration-200 backdrop-blur-sm`}>
                {type == 'form' ? (
                    <BaseCard.Form
                        cut={20}
                        borderW={2}
                        borderColor="#00FF62"
                        bg="linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 67.81%)"
                        contentPadding={24}
                    >
                        <div className="flex flex-col gap-3">
                            {/* Header */}
                            <div className="flex justify-between items-center ">
                                <h2 className="text-xl font-bold text-white font-oxanium tracking-wider uppercase">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
                                >
                                    <IoMdCloseCircle color='#8E0B0B' size={32} />
                                </button>
                            </div>

                            <div className="text-white/80">
                                {children}
                            </div>
                        </div>
                    </BaseCard.Form>
                ) : (
                    <BaseCard.None cut={20}
                        borderW={2}
                        borderColor="#00FF62"
                        bg="linear-gradient(180deg, rgba(27, 54, 36, 0.2) 0%, rgba(11, 36, 20, 0.2) 67.81%)"
                        contentPadding={24}>
                        <div className="flex flex-col gap-3">
                            {/* Header */}
                            <div className="flex justify-between items-center ">
                                <h2 className="text-xl font-bold text-white font-oxanium tracking-wider uppercase">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-white/40 hover:text-white transition-colors p-1 cursor-pointer"
                                >
                                    <IoMdCloseCircle color='#8E0B0B' size={32} />
                                </button>
                            </div>

                            <div className="text-white/80">
                                {children}
                            </div>
                        </div>
                    </BaseCard.None>
                )}

            </div>
        </div>
    )
}
