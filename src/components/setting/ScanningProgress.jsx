export default function ScanningProgress({ progress = 45 }) {
    return (
        <div className="w-full mx-auto p-4">
            <div
                className="relative h-8 overflow-hidden"
                style={{
                    backgroundColor: '#063C1B',
                    border: '1px solid #1FE36A'
                }}
            >
                <div
                    className="absolute top-0 left-0 h-full transition-all duration-500 ease-out shadow-2xl"
                    style={{
                        width: `${progress}%`,
                        backgroundColor: '#028B37'
                    }}
                />
                <div className="relative h-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-wide">
                        SCANNING ({progress}%)
                    </span>
                </div>
            </div>
        </div>
    )
}