import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BoxAllSide } from '../BaseBox';
import Table from '../table/Table';
import AddTargetModal from './AddTargetModal';
import ImportTargetModal from './ImportTargetModal';
import { formatDateTime } from '../../utils/formatDateTime';
import { useTargetApi } from '../../hooks/useTargetApi';
import { columnsTarget } from '../table/columns/columnsTarget';

const ButtonCustom = ({ onClick, label }) => {
    return (
        <BoxAllSide
            cut={14}
            borderW={2}
            borderColor="#00FF62"
            bg="rgba(0, 255, 98, 0.1)"
            contentPadding={8}
            className="w-fit! cursor-pointer hover:brightness-125 transition-all"
            onClick={onClick}
        >
            <span className="text-white font-semibold text-sm select-none mx-5 my-10 font-oxanium">
                {label}
            </span>
        </BoxAllSide>
    );
};

export default function ListTarget() {
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [isModalImportOpen, setIsModalImportOpen] = useState(false);
    const [selectedTarget, setSelectedTarget] = useState(null);

    const {
        loading,
        error,
        targets,
        getTargets,
        createTarget,
        updateTarget,
        deleteTarget,
        importTargets,
        clearError,
    } = useTargetApi();

    // 1. Memoize fungsi loadTargets agar stabil
    const loadTargets = useCallback(async () => {
        try {
            await getTargets();
        } catch (err) {
            console.error('Failed to load targets:', err);
        }
    }, [getTargets]);

    useEffect(() => {
        loadTargets();
    }, [loadTargets]);

    // 2. Gunakan useMemo untuk transformasi data tabel
    // Ini akan berjalan otomatis setiap kali 'targets' dari API berubah
    const tableData = useMemo(() => {
        if (!targets) return [];
        
        return targets.map((target, index) => ({
            no: (index + 1).toString(),
            id: target.id,
            name: target.name,
            imsi: target.imsi,
            date: formatDateTime(target.updated_at),
            alert_status: target.alert_status,
            target_status: target.target_status,
        }));
    }, [targets]);

    // 3. Gunakan useMemo untuk konfigurasi kolom
    const columns = useMemo(() => {
        return columnsTarget({ setSelectedTarget, setIsModalAddOpen });
    }, []);

    // Handlers
    const handleAddTarget = async (newTarget) => {
        try {
            await createTarget(newTarget);
            loadTargets();
        } catch (err) {
            console.error("Failed to create target:", err);
        }
    };

    const handleUpdateTarget = async (updatedTarget) => {
        try {
            await updateTarget(updatedTarget.id, updatedTarget);
            loadTargets();
        } catch (err) {
            console.error("Failed to update target:", err);
        }
    };

    const handleDeleteTarget = async (targetToDelete) => {
        try {
            await deleteTarget(targetToDelete.id);
            loadTargets();
        } catch (err) {
            console.error("Failed to delete target:", err);
        }
    };

    const handleImportTarget = async (formData, file) => {
        try {
            await importTargets(file);
            loadTargets();
        } catch (err) {
            console.error("Import error:", err);
            throw new Error("Gagal mengimport file.");
        }
    };

    return (
        <div className="flex flex-col w-full gap-4 font-sora min-h-[54vh] max-h-[54vh] overflow-auto">
            <div className='flex justify-between items-center'>
                <h3 className="text-xl font-bold text-white/90">List Target</h3>
                <div className='flex flex-row gap-3'>
                    <ButtonCustom onClick={() => {
                        setSelectedTarget(null);
                        setIsModalImportOpen(true);
                    }} label={"Import"} />

                    <ButtonCustom onClick={() => {
                        setSelectedTarget(null);
                        setIsModalAddOpen(true);
                    }} label={"Add New"} />
                </div>
            </div>

            {error && (
                <div className="bg-[#8E0B0B]/20 border border-[#8E0B0B] rounded-lg p-3">
                    <p className="text-[#FF6B6B] text-sm">{error}</p>
                    <button onClick={clearError} className="text-white/60 text-xs underline mt-1">Dismiss</button>
                </div>
            )}

            <div>
                <Table
                    columns={columns}
                    data={tableData}
                    loading={loading}
                    onRowClick={(row) => {
                        setSelectedTarget(row);
                        setIsModalAddOpen(true);
                    }}
                />
            </div>

            <AddTargetModal
                isOpen={isModalAddOpen}
                onClose={() => setIsModalAddOpen(false)}
                onAdd={handleAddTarget}
                onUpdate={handleUpdateTarget}
                onDelete={handleDeleteTarget}
                initialData={selectedTarget}
            />

            <ImportTargetModal
                isOpen={isModalImportOpen}
                onClose={() => setIsModalImportOpen(false)}
                onImport={handleImportTarget}
            />
        </div>
    );
}