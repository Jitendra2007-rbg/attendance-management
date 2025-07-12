import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Attendance from '../attendance/Attendance'
import StudentList from '../attendance/StudentList'
import AttendancePdf from '../attendance/AttendancePdf'

const AttendanceScreen = ({ sections, onAttendanceSubmit }) => {
  const { sectionId } = useParams()
  console.log(sectionId);
  const navigate = useNavigate()
  const section = sections.find(s => String(s.id) === sectionId)
  // By default, all checkboxes are unchecked (present: false)
  const getInitialAttendance = () => section?.students?.map(s => ({ regNo: s.regNo, name: s.name, present: false })) || []

  // Track if user is taking a new attendance
  const [takingNew, setTakingNew] = useState(false)
  const [attendance, setAttendance] = useState(getInitialAttendance())
  const [submitted, setSubmitted] = useState(false)

  // Reset state when section changes
  useEffect(() => {
    setTakingNew(false)
    setAttendance(getInitialAttendance())
    setSubmitted(false)
  }, [sectionId, sections])

  const handleCheckboxChange = (idx) => {
    setAttendance(attendance => attendance.map((a, i) => i === idx ? { ...a, present: !a.present } : a))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    if (onAttendanceSubmit) onAttendanceSubmit(sectionId, attendance)
  }

  const handleNewAttendance = () => {
    setAttendance(getInitialAttendance())
    setSubmitted(false)
    setTakingNew(true)
  }

  if (!section) return <div>Section not found.</div>

  // If attendance has been taken and not taking new, show previous result and button
  if (section.lastAttendance && !takingNew && !submitted) {
    return (
      <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
        <button
          onClick={() => navigate('/')}
          style={{ marginBottom: 18, padding: '8px 18px', borderRadius: 8, background: '#eee', color: '#1976d2', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
        >
          ← Back
        </button>
        <h2 style={{ color: '#1976d2', fontFamily: 'Nunito, sans-serif', marginBottom: 24 }}>{section.name} - Attendance</h2>
        <h3 style={{ color: '#1976d2', fontWeight: 700, fontSize: 20, fontFamily: 'Nunito, sans-serif', marginBottom: 8 }}>Previous Attendance Result</h3>
        <Attendance attendance={section.lastAttendance} />
        <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
          <button
            onClick={handleNewAttendance}
            style={{ padding: '10px 32px', borderRadius: 8, background: '#4caf50', color: '#fff', border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}
          >
            New Attendance
          </button>
          <AttendancePdf attendance={section.lastAttendance} sectionName={section.name} />
        </div>
      </div>
    )
  }

  // If taking new or no previous, show form or result
  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: 18, padding: '8px 18px', borderRadius: 8, background: '#eee', color: '#1976d2', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
      >
        ← Back
      </button>
      <h2 style={{ color: '#1976d2', fontFamily: 'Nunito, sans-serif', marginBottom: 24 }}>{section.name} - Attendance</h2>
      {!submitted ? (
        <StudentList students={attendance} onCheckboxChange={handleCheckboxChange} onSubmit={handleSubmit} />
      ) : (
        <>
          {section.lastAttendance && (
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ color: '#888', fontWeight: 700, fontSize: 18, fontFamily: 'Nunito, sans-serif' }}>Previous Attendance Result</h3>
              <Attendance attendance={section.lastAttendance} />
            </div>
          )}
          <h3 style={{ color: '#1976d2', fontWeight: 700, fontSize: 20, fontFamily: 'Nunito, sans-serif', marginBottom: 8 }}>Current Attendance Result</h3>
          <Attendance attendance={attendance} />
          <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
            <button
              onClick={handleNewAttendance}
              style={{ padding: '10px 32px', borderRadius: 8, background: '#4caf50', color: '#fff', border: 'none', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}
            >
              New Attendance
            </button>
            <AttendancePdf attendance={attendance} sectionName={section.name} />
            
          
          </div>
        </>
      )}
    </div>
  )
}

export default AttendanceScreen