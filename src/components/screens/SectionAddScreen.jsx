import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SectionDetails from '../sectionadd/SectionDetails'
import StudentForm from '../sectionadd/StudentForm'

const SectionAddScreen = ({ onConfirm }) => {
  const [sectionName, setSectionName] = useState('')
  const [students, setStudents] = useState([])
  const [showStudentForm, setShowStudentForm] = useState(false)
  const navigate = useNavigate()

  const handleSectionNameChange = (e) => setSectionName(e.target.value)
  const handleAddStudent = (student) => {
    setStudents([...students, student])
    setShowStudentForm(false)
  }
  const handleConfirm = () => {
    if (sectionName && students.length > 0) {
      onConfirm({ name: sectionName, students })
      setSectionName('')
      setStudents([])
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: 18, padding: '8px 18px', borderRadius: 8, background: '#eee', color: '#1976d2', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
      >
        ← Back
      </button>
      <SectionDetails sectionName={sectionName} onSectionNameChange={handleSectionNameChange} />
      <button
        onClick={() => setShowStudentForm(true)}
        style={{ margin: '16px 0', padding: '8px 16px', borderRadius: 8, background: '#4caf50', color: '#fff', border: 'none', fontSize: 16 }}
      >
        Add Student
      </button>
      {showStudentForm && <StudentForm onAddStudent={handleAddStudent} />}
      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: 'Nunito, sans-serif', color: '#1976d2', marginBottom: 12 }}>Students in Section</h3>
        {students.length === 0 ? (
          <div style={{ color: '#888', fontStyle: 'italic' }}>No students added yet.</div>
        ) : (
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
                <th style={{ padding: '10px 0', fontWeight: 700, color: '#1976d2' }}>Registration Number</th>
                <th style={{ padding: '10px 0', fontWeight: 700, color: '#1976d2' }}>Name</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ textAlign: 'center', padding: '8px 0' }}>{idx + 1}</td>
                  <td style={{ textAlign: 'center', padding: '8px 0' }}>{s.regNo}</td>
                  <td style={{ textAlign: 'center', padding: '8px 0' }}>{s.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button
        onClick={handleConfirm}
        style={{ marginTop: 24, padding: '10px 32px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontSize: 17, fontWeight: 700 }}
        disabled={!sectionName || students.length === 0}
      >
        Confirm Section
      </button>
    </div>
  )
}

export default SectionAddScreen