import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarForm from './CalendarForm';

function CalendarMain() {
  const [value, onChange] = useState(new Date());
  const [showForm, setShowForm] = useState(false);

  const showCom = (e) => {
    setShowForm(true);
  };

  console.log(value);

  return (
    <div>
      <Calendar
        ondblclick={showCom}
        onChange={onChange}
        value={value}
      />
      {(() => {
        if (showForm) {
          return (
            <CalendarForm />
          );
        }
      })()}
    </div>
  );
}

export default CalendarMain;
