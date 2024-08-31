import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { boardService } from "../services/board";

export function DueDatePicker({ task, taskId, onUpdated }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
  const [isCheckedDueDate, setCheckedDueDate] = useState(false);
  const [isCheckedStartDate, setCheckedStartDate] = useState(false);

  const [dueDate, setDueDate] = useState(boardService.getEmptyDueDate());
  const [dueTime, setDueTime] = useState("");

  function handleSelectedDayOrRange(dayOrRange) {
   
    console.log(dayOrRange);

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

      const startDateInput = document.getElementsByName("startDate")[0];
      const dueDateInput = document.getElementsByName("dueDate")[0];

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
        const startDateInput = document.getElementsByName("startDate")[0];
        if (startDateInput) {
          startDateInput.value = formattedDate;
          setDueDate((prev) => ({ ...prev, createdAt: formattedDate }));
        }
      } else if (
        isCheckedDueDate ||
        (!isCheckedDueDate && !isCheckedStartDate)
      ) {
        const dueDateInput = document.getElementsByName("dueDate")[0];
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
    const startDateInput = document.getElementsByName("startDate")[0];

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
    const dueDateInput = document.getElementsByName("dueDate")[0];

    if (!newCheckedDue) {
      const dueDateInput = document.getElementsByName("dueDate")[0];
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
  function handleClick(){
    console.log("dueDate", dueDate);
    // const UpdateTask = {
    //   ...task, dueDate: dueDate
    // }
    // console.log(UpdateTask)
    onUpdated('dueDate',dueDate)
  }

  return (
    <div>
      <div>
        <h4>Dates</h4>
      </div>
      <DayPicker
        selected={
          isCheckedStartDate && isCheckedDueDate ? selectedRange : selectedDate
        }
        onSelect={handleSelectedDayOrRange}
        mode={isCheckedStartDate && isCheckedDueDate ? "range" : "single"}
      />
      <ul>
        <li>
          <label>Start date</label>
          <input
            type="checkbox"
            checked={isCheckedStartDate}
            onChange={handleStartDate}
          />
          <input type="date" name="startDate" />
        </li>
        <li>
          <label>Due date</label>
          <input
            type="checkbox"
            checked={isCheckedDueDate}
            onChange={handleDueDate}
          />
          <input type="date" name="dueDate" />
          <input type="time" value={dueTime} onChange={handleDueTimeChange} />
        </li>
      </ul>
      <button onClick={handleClick}>save</button>
    </div>
  );
}

// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { boardService } from "../services/board";

// export function DueDatePicker({ task, taskId, onUpdated }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedRange, setSelectedRange] = useState({ from: null, to: null });
//   const [isCheckedDueDate, setCheckedDueDate] = useState(false);
//   const [isCheckedStartDate, setCheckedStartDate] = useState(false);

//   const [dueDate, setDueDate] = useState(boardService.getEmptyDueDate());
//   const [dueTime, setDueTime] = useState("");

//   function handleSelectedDayOrRange(dayOrRange) {
//     console.log(dayOrRange);

//     if (isCheckedStartDate && isCheckedDueDate) {
//       if (!dayOrRange || !dayOrRange.from || !dayOrRange.to) return;
//       setSelectedRange(dayOrRange);

//       const formattedStartDate = new Date(
//         dayOrRange.from.getTime() - dayOrRange.from.getTimezoneOffset() * 60000
//       )
//         .toISOString()
//         .split("T")[0];

//       const formattedDueDate = new Date(
//         dayOrRange.to.getTime() - dayOrRange.to.getTimezoneOffset() * 60000
//       )
//         .toISOString()
//         .split("T")[0];

//       const startDateInput = document.getElementsByName("startDate")[0];
//       const dueDateInput = document.getElementsByName("dueDate")[0];

//       if (startDateInput) {
//         startDateInput.value = formattedStartDate;
//       }
//       if (dueDateInput) {
//         dueDateInput.value = formattedDueDate;
//       }
//     } else {
//       if (!dayOrRange) return;
//       setSelectedDate(dayOrRange);

//       const formattedDate = new Date(
//         dayOrRange.getTime() - dayOrRange.getTimezoneOffset() * 60000
//       )
//         .toISOString()
//         .split("T")[0];

//       if (isCheckedStartDate) {
//         const startDateInput = document.getElementsByName("startDate")[0];
//         if (startDateInput) {
//           startDateInput.value = formattedDate;
//         }
//       } else if (
//         isCheckedDueDate ||
//         (!isCheckedDueDate && !isCheckedStartDate)
//       ) {
//         const dueDateInput = document.getElementsByName("dueDate")[0];
//         if (!isCheckedDueDate && !isCheckedStartDate) {
//           handleDueDate();
//         }
//         if (dueDateInput) {
//           dueDateInput.value = formattedDate;
//         }
//       }
//     }
//   }

//   function handleStartDate() {
//     const newCheckedState = !isCheckedStartDate;
//     const startDateInput = document.getElementsByName("startDate")[0]

//     if (!newCheckedState) {
//       startDateInput.value = "";
//     }else{
//       const selected = selectedRange?.to || selectedDate || new Date();
//       const formattedDate = formatDateForInput(selected);

//       if (startDateInput) {
//         startDateInput.value = formattedDate;
//       }
//     }
//     setCheckedStartDate(newCheckedState);
//   }

//   function handleDueDate() {
//     const newCheckedDue = !isCheckedDueDate;
//     const dueDateInput = document.getElementsByName("dueDate")[0];

//     if (!newCheckedDue) {
//       const dueDateInput = document.getElementsByName("dueDate")[0];
//       dueDateInput.value = "";
//       setDueTime("");
//     } else {
//       const selected = selectedRange?.to || selectedDate || new Date();
//       const formattedDate = formatDateForInput(selected);

//       if (dueDateInput) {
//         dueDateInput.value = formattedDate;
//       }
//       const now = new Date();
//       const hours = now.getHours().toString().padStart(2, "0");
//       const minutes = now.getMinutes().toString().padStart(2, "0");
//       setDueTime(`${hours}:${minutes}`);
//     }

//     setCheckedDueDate(newCheckedDue);
//   }

//   function formatDateForInput(date) {
//     const adjustedDate = new Date(
//       date.getTime() - date.getTimezoneOffset() * 60000
//     );
//     return adjustedDate.toISOString().split("T")[0];
//   }

//   function handleDueTimeChange({ target }) {
//     setDueTime(target.value);
//   }

//   return (
//     <div>
//       <div>
//         <h4>Dates</h4>
//       </div>
//       <DayPicker
//         selected={
//           isCheckedStartDate && isCheckedDueDate ? selectedRange : selectedDate
//         }
//         onSelect={handleSelectedDayOrRange}
//         mode={isCheckedStartDate && isCheckedDueDate ? "range" : "single"}
//       />
//       <ul>
//         <li>
//           <label>Start date</label>
//           <input
//             type="checkbox"
//             checked={isCheckedStartDate}
//             onChange={handleStartDate}
//           />
//           <input type="date" name="startDate" />
//         </li>
//         <li>
//           <label>Due date</label>
//           <input
//             type="checkbox"
//             checked={isCheckedDueDate}
//             onChange={handleDueDate}
//           />
//           <input type="date" name="dueDate" />
//           <input type="time" value={dueTime} onChange={handleDueTimeChange} />
//         </li>
//       </ul>
//     </div>
//   );
// }

// import { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { boardService } from "../services/board";

// export function DueDatePicker({ task, taskId, onUpdated }) {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isCheckedDueDate, setCheckedDueDate] = useState(false);
//   const [isCheckedStartDate, setCheckedStartDate] = useState(false);
//   const [dueDate, setDueDate] = useState(boardService.getEmptyDueDate());
//   // const updatedDueDate = task.dueDate ? { ...task.dueDate } : { ...dueDate };
//   // console.log(selectedDate)

//   function handleSelectedDay(day) {
//     if (!day) return;

//     setSelectedDate(day);

//     const formattedDate = new Date(
//       day.getTime() - day.getTimezoneOffset() * 60000
//     )
//       .toISOString()
//       .split("T")[0];

//     const dueDateChecked =
//       isCheckedDueDate || (!isCheckedDueDate && !isCheckedStartDate);
//     const startDateChecked = isCheckedStartDate && !isCheckedDueDate;

//     if (dueDateChecked) {
//       setCheckedDueDate(true);
//       const dateInput = document.getElementsByName("dueDate")[0];
//       if (dateInput) {
//         dateInput.value = formattedDate;
//       }
//     } else if (startDateChecked) {
//       const dateInput = document.getElementsByName("startDate")[0];
//       if (dateInput) {
//         dateInput.value = formattedDate;
//       }
//     }
//   }
//   function hendleStartDate() {
//     const newCheckedState = !isCheckedStartDate;
//     console.log(newCheckedState);

//     if (!newCheckedState) {
//       const dateInput = document.getElementsByName("startDate")[0];
//       dateInput.value = "";
//     }
//     setCheckedStartDate(newCheckedState);
//   }

//   function hendleDueDate(){
//     const newCheckedDue = !isCheckedDueDate;

//     if (!newCheckedDue) {
//       const dateInput = document.getElementsByName("dueDate")[0];
//       dateInput.value = "";
//     }
//     setCheckedDueDate(newCheckedDue)

//   }

//   return (
//     <div>
//       <div>
//         <h4>Dates</h4>
//       </div>
//       <DayPicker
//         selected={selectedDate}
//         onSelect={handleSelectedDay}
//         mode="single"
//       />
//       <ul>
//         <li>
//           <label>Start date</label>
//           <input
//             type="checkbox"
//             checked={isCheckedStartDate}
//             onChange={hendleStartDate}
//           />
//           <input type="date" name="startDate" />
//         </li>
//         <li>
//           <label>Due date</label>
//           <input
//             type="checkbox"
//             checked={isCheckedDueDate}
//             onChange={hendleDueDate}
//           />
//           <input type="date" name="dueDate" />
//         </li>
//       </ul>
//     </div>
//   );
// }
