import React, { useState } from 'react';

const CalendarPicker = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const generateCalendar = () => {
    const days = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const lastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= lastDate; d++) {
      days.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), d));
    }

    return days;
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div style={{ position: 'relative', fontFamily: 'sans-serif' }}>
      <div
        onClick={toggleCalendar}
        style={{
          padding: '10px 16px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f4eed2',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 'bold'
        }}
      >
        {formatDate(selectedDate)}
        <span role="img" aria-label="calendar">📅</span>
      </div>

      {showCalendar && (
        <div
          style={{
            position: 'absolute',
            top: '45px',
            left: 0,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            padding: '10px',
            zIndex: 10
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontWeight: 'bold' }}>{d}</div>
            ))}
            {generateCalendar().map((day, idx) => (
              <div
                key={idx}
                onClick={() => day && handleDateClick(day)}
                style={{
                  height: '32px',
                  textAlign: 'center',
                  lineHeight: '32px',
                  borderRadius: '6px',
                  backgroundColor:
                    day?.toDateString() === selectedDate.toDateString()
                      ? '#5D9CEC'
                      : '#f0f0f0',
                  color:
                    day?.toDateString() === selectedDate.toDateString()
                      ? 'white'
                      : 'black',
                  cursor: day ? 'pointer' : 'default'
                }}
              >
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
