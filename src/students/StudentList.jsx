import React from 'react';

const StudentList = ({ students, onCheckboxChange, onSubmit }) => {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} style={{ marginTop: 24 }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        fontFamily: 'Nunito, sans-serif',
        overflow: 'hidden',
      }}>
        <thead>
          <tr style={{ background: '#e3ffe8' }}>
            <th style={{ padding: '10px 0', fontWeight: 700, color: '#1976d2' }}>Sl. No</th>
            <th style={{ padding: '10px 0', fontWeight: 700, color: '#1976d2' }}>Name</th>
            <th style={{ padding: '10px 0', fontWeight: 700, color: '#1976d2' }}>Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ textAlign: 'center', padding: '8px 0' }}>{idx + 1}</td>
              <td style={{ textAlign: 'center', padding: '8px 0' }}>{s.name}</td>
              <td style={{ textAlign: 'center', padding: '8px 0' }}>
                <input
                  type="checkbox"
                  checked={s.present}
                  onChange={() => onCheckboxChange(idx)}
                  style={{ width: 20, height: 20 }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="submit"
        style={{ marginTop: 24, padding: '10px 32px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}
      >
        Submit Attendance
      </button>
    </form>
  );
};

export default StudentList;