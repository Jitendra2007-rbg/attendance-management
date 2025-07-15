import React, { useState } from 'react';

const boxStyle = (bgColor, textColor) => ({
  background: bgColor,
  color: textColor,
  borderRadius: 16,
  padding: '28px 0',
  textAlign: 'center',
  fontWeight: '700',
  fontFamily: 'Nunito, sans-serif',
  fontSize: 24,
  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
  width: '90%',
  maxWidth: 360,
  margin: '12px auto',
  position: 'relative',
  cursor: 'pointer',
});

const tooltipStyle = {
  position: 'absolute',
  top: -10,
  right: 0,
  backgroundColor: '#fff',
  color: '#333',
  padding: '10px 16px',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  zIndex: 10,
  fontSize: 14,
  textAlign: 'left',
  whiteSpace: 'pre-wrap',
  maxWidth: 220,
};

const Attendance = ({ attendance }) => {
  const present = attendance.filter(a => a.present);
  const absent = attendance.filter(a => !a.present);
  const total = attendance.length;

  const [hoveredBox, setHoveredBox] = useState(null);

  const getTooltipContent = (students) => {
    if (students.length === 0) return "None";
    return students.map((s, i) => `${i + 1}. ${s.regNo}`).join('\n');
  };

  return (
    <div style={{ marginTop: 24, marginBottom: 40 }}>
      {/* Present */}
      <div
        style={boxStyle('linear-gradient(to right, #e3ffe8, #b2f7ef)', '#2e7d32')}
        onMouseEnter={() => setHoveredBox('present')}
        onMouseLeave={() => setHoveredBox(null)}
      >
        <div style={{ fontSize: 40 }}>🧍‍♂️</div>
        <div>{present.length}</div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Present</div>
        {hoveredBox === 'present' && (
          <div style={{ ...tooltipStyle, top: '100%', marginTop: 10 }}>
            <strong>Present RegNos:</strong>
            <br />
            {getTooltipContent(present)}
          </div>
        )}
      </div>

      {/* Absent */}
      <div
        style={boxStyle('linear-gradient(to right, #ffe3e3, #ffcccc)', '#c62828')}
        onMouseEnter={() => setHoveredBox('absent')}
        onMouseLeave={() => setHoveredBox(null)}
      >
        <div style={{ fontSize: 40 }}>🙅‍♂️</div>
        <div>{absent.length}</div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Absent</div>
        {hoveredBox === 'absent' && (
          <div style={{ ...tooltipStyle, top: '100%', marginTop: 10 }}>
            <strong>Absent RegNos:</strong>
            <br />
            {getTooltipContent(absent)}
          </div>
        )}
      </div>

      {/* Total (no tooltip) */}
      <div style={boxStyle('linear-gradient(to right, #e3f2fd, #bbdefb)', '#1565c0')}>
        <div style={{ fontSize: 40 }}>👥</div>
        <div>{total}</div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>Total</div>
      </div>
    </div>
  );
};

export default Attendance;
