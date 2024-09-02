import React from "react";

export function ProgressBar({ items }) {
  const completedItemsCount = items.filter((item) => item.isChecked).length;
  const totalItems = items.length;
  const percentage =
    totalItems > 0 ? (completedItemsCount / totalItems) * 100 : 0;

  function progressColor() {
    if (percentage >= 0 && percentage < 100) return "#579dff";
    else if (percentage === 100) return "#1f845a";
  }
  return (
    <div className="progress-container">
      <span className="progress-bar-percentage">{percentage.toFixed(0)}%</span>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: progressColor(),
          }}
        ></div>
      </div>
    </div>
  );
}
