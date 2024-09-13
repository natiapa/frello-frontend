import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { boardService } from "../services/board";

export function DueDatePicker({
  onUpdated = () => {},
  board,
  task,
  group,
  setIsPopoverOpen,
  handlePopoverClick,
  setNewDueDate,

}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const [isCheckedDueDate, setCheckedDueDate] = useState(false);
  const [isCheckedStartDate, setCheckedStartDate] = useState(false);

  const [dueDate, setDueDate] = useState(boardService.getEmptyDueDate());
  const [dueTime, setDueTime] = useState("");

  function handleSelectedDayOrRange(dayOrRange) {
    if (isCheckedStartDate && isCheckedDueDate) {
      if (!dayOrRange || !dayOrRange.from || !dayOrRange.to) return;
      setSelectedRange(dayOrRange);

      const formattedStartDate = new Date(
        dayOrRange.from.getTime() - dayOrRange.from.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      const formattedDueDate = new Date(
        dayOrRange.to.getTime() - dayOrRange.to.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      const startDateInput = document.querySelector("[name='startDate']");
      const dueDateInput = document.querySelector("[name='dueDate']");

      if (startDateInput) {
        startDateInput.value = formattedStartDate;
        setDueDate((prev) => ({ ...prev, createdAt: formattedStartDate }));
      }
      if (dueDateInput) {
        dueDateInput.value = formattedDueDate;
        setDueDate((prev) => ({ ...prev, date: formattedDueDate }));
      }
    } else {
      if (!dayOrRange) return;
      setSelectedDate(dayOrRange);

      const formattedDate = new Date(
        dayOrRange.getTime() - dayOrRange.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      if (isCheckedStartDate) {
        const startDateInput = document.querySelector("[name='startDate']");
        if (startDateInput) {
          startDateInput.value = formattedDate;
          setDueDate((prev) => ({ ...prev, createdAt: formattedDate }));
        }
      } else if (
        isCheckedDueDate ||
        (!isCheckedDueDate && !isCheckedStartDate)
      ) {
        const dueDateInput = document.querySelector("[name='dueDate']");
        if (!isCheckedDueDate && !isCheckedStartDate) {
          handleDueDate();
        }
        if (dueDateInput) {
          dueDateInput.value = formattedDate;
          setDueDate((prev) => ({ ...prev, date: formattedDate }));
        }
      }
    }
  }

  function handleStartDate() {
    const newCheckedState = !isCheckedStartDate;
    const startDateInput = document.querySelector("[name='startDate']");

    if (!newCheckedState) {
      startDateInput.value = "";
      setDueDate((prev) => ({ ...prev, createdAt: "" }));
    } else {
      const selected = selectedRange?.to || selectedDate || new Date();
      const formattedDate = formatDateForInput(selected);

      if (startDateInput) {
        startDateInput.value = formattedDate;
        setDueDate((prev) => ({ ...prev, createdAt: formattedDate }));
      }
    }
    setCheckedStartDate(newCheckedState);
  }

  function handleDueDate() {
    const newCheckedDue = !isCheckedDueDate;
    const dueDateInput = document.querySelector("[name='dueDate']");

    if (!newCheckedDue) {
      dueDateInput.value = "";
      setDueTime("");
      setDueDate((prev) => ({ ...prev, date: "", time: "" }));
    } else {
      const selected = selectedRange?.to || selectedDate || new Date();
      const formattedDate = formatDateForInput(selected);

      if (dueDateInput) {
        dueDateInput.value = formattedDate;
      }
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setDueTime(`${hours}:${minutes}`);
      setDueDate((prev) => ({
        ...prev,
        date: formattedDate,
        time: `${hours}:${minutes}`,
      }));
    }

    setCheckedDueDate(newCheckedDue);
  }

  function formatDateForInput(date) {
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return adjustedDate.toISOString().split("T")[0];
  }

  function handleDueTimeChange({ target }) {
    setDueTime(target.value);
  }

  function handleClick({ target }) {
    const { name } = target;

    const actions = {
      remove: () => onUpdated("dueDate", ""),
      save: () => onUpdated("dueDate", dueDate),
    };

    if (actions[name]) {
      actions[name]();
    }
    setNewDueDate(dueDate);
    console.log(dueDate);

    if (dueDate.date) {
      boardService.updateActivities(
        board,
        "title",
        "setDueDate",
        group,
        task,
        "",
        "",
        "",
        dueDate
      );
    }
    setIsPopoverOpen(false);
  }

  return (
    <div className="due-date-picker" onClick={handlePopoverClick}>
      <h4>Dates</h4>
      <DayPicker
        selected={
          isCheckedStartDate && isCheckedDueDate ? selectedRange : selectedDate
        }
        onSelect={handleSelectedDayOrRange}
        mode={isCheckedStartDate && isCheckedDueDate ? "range" : "single"}
      />
      <ul className="date-options">
        <label className="date-label">Start date</label>
        <li className="date-option">
          <input
            className="date-checkbox"
            type="checkbox"
            checked={isCheckedStartDate}
            onChange={handleStartDate}
          />

          <input className="date-input" type="date" name="startDate" />
        </li>
        <label className="date-label">Due date</label>
        <li className="date-option">
          <input
            className="date-checkbox"
            type="checkbox"
            checked={isCheckedDueDate}
            onChange={handleDueDate}
          />

          <input className="date-input" type="date" name="dueDate" />
          <input
            className="time-input"
            type="time"
            value={dueTime}
            onChange={handleDueTimeChange}
          />
        </li>
      </ul>
      <button name="save" className="save-button" onClick={handleClick}>
        Save
      </button>
      <button name="remove" className="save-button" onClick={handleClick}>
        Remove
      </button>
    </div>
  );
}

