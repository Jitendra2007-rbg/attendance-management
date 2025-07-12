import React from 'react';

// You can use Material Icons or emoji for icons
const badgeStyle = (bg, color) => ({
  display: 'inline-block',
  minWidth: 32,
  padding: '4px 12px',
  borderRadius: 16,
  background: bg,
  color,
  fontWeight: 700,
  fontSize: 16,
  marginLeft: 8,
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
});

const cardStyle = {
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(25, 118, 210, 0.08)',
  padding: 28,
  maxWidth: 420,
  margin: '32px auto',
  fontFamily: 'Nunito, sans-serif',
};

const Attendance = ({ attendance }) => {
  const present = attendance.filter(a => a.present);
  const absent = attendance.filter(a => !a.present);
  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#1976d2', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span role="img" aria-label="clipboard">📋</span> Attendance Summary
      </h2>
      <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
        <span style={badgeStyle('#e8f5e9', '#388e3c')}>
          <span role="img" aria-label="present">✔️</span> Present: {present.length}
        </span>
        <span style={badgeStyle('#ffebee', '#d32f2f')}>
          <span role="img" aria-label="absent">❌</span> Absent: {absent.length}
        </span>
      </div>
      {absent.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ color: '#d32f2f', fontWeight: 700, fontSize: 17, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span role="img" aria-label="absent">❌</span> Absent Students
          </div>
          <ul style={{ color: '#d32f2f', fontWeight: 600, fontSize: 15, paddingLeft: 22 }}>
            {absent.map((a, idx) => (
              <li key={idx} style={{ marginBottom: 2 }}>{a.name} <span style={{ fontSize: 13, color: '#b71c1c' }}>({a.regNo})</span></li>
            ))}
          </ul>
        </div>
      )}
      {present.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ color: '#388e3c', fontWeight: 700, fontSize: 17, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span role="img" aria-label="present">✔️</span> Present Students
          </div>
          <ul style={{ color: '#388e3c', fontWeight: 600, fontSize: 15, paddingLeft: 22 }}>
            {present.map((a, idx) => (
              <li key={idx} style={{ marginBottom: 2 }}>{a.name} <span style={{ fontSize: 13, color: '#1b5e20' }}>({a.regNo})</span></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Attendance;