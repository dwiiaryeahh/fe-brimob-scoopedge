import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Table from '../table/Table'
import ReportDetailModal from './ReportDetailModal';
import { useReportApi } from '../../hooks';
import { columnsReport } from '../table/columns/columnsReport';

export default function ListReport({ filterMode }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)

    const {
        loading,
        error,
        reports,
        getReports,
        clearError
    } = useReportApi()

    useEffect(() => {
        getReports(filterMode)
    }, [filterMode, getReports])

    // 1. Gunakan useCallback agar fungsi ini stabil (tidak berubah tiap render)
    const handleOpenDetail = useCallback((row) => {
        setSelectedReport(row)
        setIsModalOpen(true)
    }, [])

    // 2. WAJIB: Gunakan useMemo untuk columns agar Table tidak re-render terus menerus
    const columns = useMemo(() => 
        columnsReport({ handleOpenDetail }), 
    [handleOpenDetail])

    // 3. Transformasi data sudah benar menggunakan useMemo
    const filteredData = useMemo(() => {
        if (!reports) return []

        return reports.map((item, index) => ({
            ...item,
            no: (index + 1).toString(),
            start_scan: item.start_scan || null,
            stop_scan: item.stop_scan || null,
            crawling_count: item.crawling_count || 0
        }))
    }, [reports])

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[45vh] max-h-[47vh]">

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg flex justify-between items-center text-sm">
                    {error}
                    <button onClick={clearError} className="underline text-xs">Dismiss</button>
                </div>
            )}

            <div className="overflow-auto">
                <Table
                    columns={columns}
                    data={filteredData}
                    loading={loading}
                    onRowClick={handleOpenDetail}
                />
            </div>

            <ReportDetailModal
                title={selectedReport?.name ?? "Report Detail"}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                reportId={selectedReport?.id}
            />
        </div>
    )
}