// @/app/components/DashboardLoading.tsx 
'use client'

import React from 'react';
import { useSession } from "next-auth/react"

// --- Helper Components (Simple Tailwind Skeletons) ---
const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} />
);

const Spinner = () => (
    <div 
        className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" 
        role="status" 
    />
);
// --------------------------------------------------------

const DashboardLoading = () => {
    // Note: We use useSession here only to check if the session is done loading.
    // The parent wrapper already handles showing this component when status is 'loading'.
    
    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 absolute top-0 left-0 z-50">
            {/* 1. Simulated Sidebar (W-64 to match your layout) */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-center h-16 mb-4">
                    <Spinner />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-8 w-4/5" />
                </div>
            </aside>

            {/* 2. Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8">
                {/* Header Skeleton */}
                <div className="mb-10 flex justify-between items-center">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                {/* Cards/Metrics Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg hidden lg:block" />
                </div>

                {/* Table/Data View Skeleton */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <Skeleton className="h-12 w-full mb-3" />
                    <Skeleton className="h-12 w-full mb-3" />
                    <Skeleton className="h-12 w-full mb-3" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </main>
        </div>
    );
};

export default DashboardLoading;