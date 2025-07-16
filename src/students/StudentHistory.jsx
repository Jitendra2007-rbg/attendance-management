import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const StudentHistory = ({ sections }) => {
  const navigate = useNavigate();
  const { sectionId, regNo } = useParams();
  const section = sections.find(sec => String(sec.id) === sectionId);
  const student = section?.students?.find(s => String(s.regNo) === regNo);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  if (!student) return <div>Student not found</div>;

  const attendance = student.attendance || [];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0=Sun
  const startingEmptyCells = (firstDayOfWeek + 6) % 7; // make Mon start

  const calendarDates = [];

  for (let i = 0; i < startingEmptyCells; i++) {
    calendarDates.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendarDates.push(new Date(currentYear, currentMonth, d));
  }

 const formatToDDMMYYYY = (date) => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

const getStatus = (date) => {
  const formattedDate = formatToDDMMYYYY(date); // → "15-07-2025"
  const entry = attendance.find(a => a.date === formattedDate);
  const day = date.getDay();

  if (entry?.status === 'present') return 'present';
  if (entry?.status === 'absent') return 'absent';
  if (day === 0 || day === 6) return 'weekend';
  return 'none';
};


  const getColor = (status) => {
    switch (status) {
      case 'present': return '#a5d6a7'; // green
      case 'absent': return '#ef9a9a';  // red
      case 'weekend': return '#ffcc80'; // orange
      default: return '#f0f0f0';
    }
  };

  const presentDays = attendance.filter(a => {
    const d = new Date(a.date);
    return a.status === 'present' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const absentDays = attendance.filter(a => {
    const d = new Date(a.date);
    return a.status === 'absent' && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const workingDays = presentDays.length + absentDays.length;
  const percentage = workingDays > 0 ? ((presentDays.length / workingDays) * 100).toFixed(2) : 'N/A';

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 32 }}>
      <button
        onClick={() => navigate(`/section/${sectionId}`)}
        style={{
          marginBottom: 20,
          padding: '8px 16px',
          borderRadius: 6,
          backgroundColor: '#eeeeee',
          fontWeight: 'bold',
          border: 'none',
          cursor: 'pointer',
          color: '#1976d2'
        }}
      >
        ← Back
      </button>

      <h2 style={{ color: '#1976d2' }}>{student.name}'s Attendance</h2>
      <p><strong>Reg No:</strong> {student.regNo}</p>
      <p><strong>Attendance %:</strong> {percentage}%</p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '20px 0'
      }}>
        <button
          onClick={goToPrevMonth}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          ⬅️ Prev
        </button>
        <h3>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button
          onClick={goToNextMonth}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Next ➡️
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 600
      }}>
        {dayNames.map((day, idx) => (
          <div key={idx}>{day}</div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 8
      }}>
        {calendarDates.map((date, idx) => {
          if (!date) return <div key={idx}></div>;
          const status = getStatus(date);
          const bgColor = getColor(status);

          return (
            <div
              key={idx}
              style={{
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bgColor,
                borderRadius: 6,
                fontWeight: 600
              }}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentHistory;
