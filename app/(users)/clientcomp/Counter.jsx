import React, { useState } from 'react'
export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <button
            onClick={increment}
            className="text-gray-200 text-2xl bg-orange-400 m-5 p-3 rounded-lg hover:bg-orange-600"
        >
            Increment - {count}
        </button>
    );
}
