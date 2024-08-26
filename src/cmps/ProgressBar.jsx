import React from 'react';

export function ProgressBar({ items }) {
    
    const completedItemsCount = items.filter(item => item.isChecked).length
    const totalItems = items.length
    const percentage = totalItems > 0 ? (completedItemsCount / totalItems) * 100 : 0

    return (
        <div className="progress-bar">
            <span className="progress-bar-percentage">{percentage.toFixed(2)}%</span>
            <div
                className="progress-bar-fill"
                style={{ width: `${percentage}%` }}
            >
            </div>
        </div>
    );
}