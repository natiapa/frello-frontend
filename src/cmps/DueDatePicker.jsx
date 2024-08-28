import  { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function DueDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <DayPicker
        selected={selectedDate}
        onSelect={setSelectedDate}
        mode="single"
      />
      {selectedDate && <p>Selected Date: {selectedDate.toLocaleDateString()}</p>}
    </div>
  );
}