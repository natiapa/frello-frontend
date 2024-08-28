import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DueDatePicker({ task, taskId }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isStartDateChecked, setIsStartDateChecked] = useState(false);

  function handleCheckboxChange() {
    if (!isStartDateChecked) {
      // const updateStartDay = 
      const today = new Date()
      setSelectedDate(today)

    } else {
      setSelectedDate(null);
    }
    setIsStartDateChecked(!isStartDateChecked);
  }
  console.log('selectedDate',selectedDate)
  console.log('isStartDateChecked',isStartDateChecked)

  return (
    <div>
      <div>
        <h4>Dates</h4>
      </div>
      <DayPicker
        selected={selectedDate}
        onSelect={setSelectedDate}
        mode="single"
      />
      <ul>
        <li>
          <label>Start Date</label>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={isStartDateChecked}
              onChange={handleCheckboxChange}
            />
            {selectedDate && <p>{selectedDate.toLocaleDateString()}</p>}
          </div>
        </li>
      </ul>
    </div>
  )
}
