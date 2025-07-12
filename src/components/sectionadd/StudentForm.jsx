import React, { useState } from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (regNo && name) {
      
      onAddStudent({ regNo, name });
      setRegNo('');
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      marginBottom: 24,
      background: 'linear-gradient(90deg, #e3ffe8 0%, #f9f9f9 100%)',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      padding: 24,
      maxWidth: 400,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{ color: '#1976d2', marginBottom: 18, fontFamily: 'Nunito, sans-serif' }}>Add Student</h2>
      <div style={{ width: '100%', marginBottom: 14 }}>
        <label style={{ fontWeight: 600, fontSize: 15 }}>Registration Number</label>
        <input
          type="text"
          value={regNo}
          onChange={e => setRegNo(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: '1px solid #bdbdbd',
            fontSize: 16,
            marginTop: 6,
            marginBottom: 8,
            outline: 'none',
            fontFamily: 'Nunito, sans-serif',
          }}
          required
        />
      </div>
      <div style={{ width: '100%', marginBottom: 14 }}>
        <label style={{ fontWeight: 600, fontSize: 15 }}>Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 8,
            border: '1px solid #bdbdbd',
            fontSize: 16,
            marginTop: 6,
            marginBottom: 8,
            outline: 'none',
            fontFamily: 'Nunito, sans-serif',
          }}
          required
        />
      </div>
      <button type="submit" style={{
        padding: '10px 32px',
        borderRadius: 8,
        background: 'linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)',
        color: '#fff',
        border: 'none',
        fontSize: 17,
        fontWeight: 700,
        fontFamily: 'Nunito, sans-serif',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)'
      }}>
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;