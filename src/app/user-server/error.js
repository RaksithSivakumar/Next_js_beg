"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error("Error occurred:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <h1 className="text-4xl font-bold">Error</h1>
            <p className="text-lg">An error occurred: {error.message}</p>
            <button onClick={() => reset()} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Try Again
            </button>
        </div>
    );
}