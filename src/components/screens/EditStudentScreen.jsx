import React, { useState } from 'react'

const EditStudentScreen = ({ student, onSave, onCancel }) => {
  const [name, setName] = useState(student.name || '')
  const [regNo, setRegNo] = useState(student.regNo || '')
  const [email, setEmail] = useState(student.email || '')
  const [mobile, setMobile] = useState(student.mobile || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Call backend API here to save name, regNo, email, mobile for student
    onSave({ ...student, name, regNo, email, mobile })
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(25, 118, 210, 0.08)', padding: 32 }}>
      <h2 style={{ color: '#1976d2', fontFamily: 'Nunito, sans-serif', marginBottom: 24 }}>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 700 }}>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 700 }}>Registration Number:</label>
          <input type="text" value={regNo} onChange={e => setRegNo(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 700 }}>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 700 }}>Mobile Number:</label>
          <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} required />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <button type="submit" style={{ padding: '10px 28px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Save</button>
          <button type="button" onClick={onCancel} style={{ padding: '10px 28px', borderRadius: 8, background: '#eee', color: '#1976d2', border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditStudentScreen
