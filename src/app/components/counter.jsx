'use client';

import { useState } from "react";

export function Counter() {
    console.log("Counter component rendered");
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-semibold">Counter: {count}</h2>
            <button
                className="border border-white  text-white px-4 py-2 rounded hover:bg-white-600"
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
            <button
                className="border border-white text-white px-4 py-2 rounded hover:bg-white-600"
                onClick={() => setCount(count - 1)}
            >
                Decrement
            </button>
        </div>
    );
}