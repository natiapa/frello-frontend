import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { boardService } from "../services/board";

export function DueDatePicker({ task, taskId, onUpdated }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isStartDateChecked, setIsStartDateChecked] = useState(false);
  const [dueDate, setDueDate] = useState(boardService.getEmptyDueDate());

  function handleCheckboxChange() {
    const updatedDueDate = task.dueDate ? { ...task.dueDate } : { ...dueDate };

    if (!isStartDateChecked) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-GB")

      setSelectedDate(today);
      updatedDueDate.createdAt = formattedDate;
      onUpdated("dueDate", updatedDueDate);
    } else {
      setSelectedDate(null);
      updatedDueDate.createdAt = "";
      onUpdated("dueDate", updatedDueDate);
    }
    setIsStartDateChecked(!isStartDateChecked);
  }

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
          <div>
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
