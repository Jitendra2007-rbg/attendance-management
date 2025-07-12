import React, { useState } from 'react'

// Helper to generate a color for each alphabet
const getColorForChar = (char) => {
  const colors = [
    '#1976d2', '#388e3c', '#d32f2f', '#fbc02d', '#7b1fa2', '#0288d1', '#c2185b', '#388e3c', '#f57c00', '#455a64',
    '#0097a7', '#c62828', '#2e7d32', '#fbc02d', '#512da8', '#1976d2', '#388e3c', '#d32f2f', '#fbc02d', '#7b1fa2',
    '#0288d1', '#c2185b', '#388e3c', '#f57c00', '#455a64', '#0097a7'
  ];
  if (!char) return '#1976d2';
  const idx = char.toUpperCase().charCodeAt(0) - 65;
  return colors[(idx + colors.length) % colors.length];
};

const StudentInfo = ({ student, onEdit, onHistory, slNo }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const firstChar = student.name ? student.name.trim()[0].toUpperCase() : '?';
  const avatarColor = getColorForChar(firstChar);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee', background: menuOpen ? '#f5faff' : 'transparent', transition: 'background 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontWeight: 600, color: '#888', minWidth: 28, textAlign: 'right' }}>{slNo}.</div>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: `linear-gradient(135deg, ${avatarColor} 60%, #e3f2fd 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 20, color: '#fff', boxShadow: '0 2px 8px rgba(25,118,210,0.08)'
        }}>{firstChar}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{student.name}</div>
          <div style={{ color: '#888', fontSize: 13 }}>{student.regNo}</div>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(m => !m)}
          style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888', padding: 4 }}
          aria-label="More options"
        >
          &#8942;
        </button>
        {menuOpen && (
          <div style={{ position: 'absolute', right: 0, top: 28, background: '#fff', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', zIndex: 10 }}>
            <div
              onClick={() => { setMenuOpen(false); onEdit(student); }}
              style={{ padding: '10px 24px', cursor: 'pointer', borderBottom: '1px solid #eee', fontSize: 15 }}
            >
              Edit
            </div>
            <div
              onClick={() => { setMenuOpen(false); onHistory(student); }}
              style={{ padding: '10px 24px', cursor: 'pointer', fontSize: 15 }}
            >
              History
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentInfo