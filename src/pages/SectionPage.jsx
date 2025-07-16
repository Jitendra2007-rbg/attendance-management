import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentForm from '../students/StudentForm';
import StudentInfo from '../students/StudentInfo';

const SectionScreen = ({ sections, onAddStudent }) => {
  const [showForm, setShowForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [showHistoryStudent, setShowHistoryStudent] = useState(null);
  const navigate = useNavigate();
  const { sectionId } = useParams();
  const section = sections.find(s => String(s.id) === sectionId);

  if (!section) return null;

  const handleHistory = (student) => {
  navigate(`/history/${sectionId}/${student.regNo}`);
};



  const handleEdit = (student) => {
    navigate(`/edit-student/${sectionId}/${student.regNo}`);
  };
  

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 32 }}>
      <button
        onClick={() => navigate('/')}
        style={{ marginBottom: 18, padding: '8px 18px', borderRadius: 8, background: '#eee', color: '#1976d2', border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}
      >
        ← Back
      </button>
      <h2 style={{ color: '#1976d2', fontFamily: 'Nunito, sans-serif', marginBottom: 24 }}>{section.name}</h2>
      <button
        style={{
          marginBottom: 24,
          padding: '10px 32px',
          borderRadius: 8,
          background: '#4caf50',
          color: '#fff',
          border: 'none',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'Nunito, sans-serif',
          cursor: 'pointer',
        }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add Student'}
      </button>
      {showForm && (
        <StudentForm onAddStudent={student => onAddStudent(sections.findIndex(s => String(s.id) === sectionId), student)} />
      )}
      {/* Only show a summary message and New Attendance button, not the result */}
      {section.lastAttendance ? (
        <>
          <div style={{ color: '#1976d2', fontWeight: 700, fontSize: 18, fontFamily: 'Nunito, sans-serif', margin: '24px 0 8px' }}>
            Last attendance has been recorded for this section.
          </div>
          <h3 style={{ color: '#333', fontFamily: 'Nunito, sans-serif', marginBottom: 12 }}>Students</h3>
          {section.students && section.students.length > 0 ? (
            <div>
              {section.students.map((s, idx) => (
                <StudentInfo key={s.regNo || idx} student={s} onEdit={handleEdit} onHistory={handleHistory} slNo={idx + 1} />
              ))}
            </div>
          ) : (
            <div style={{ color: '#888', fontStyle: 'italic' }}>No students in this section.</div>
          )}
        </>
      ) : (
        <>
          <h3 style={{ color: '#333', fontFamily: 'Nunito, sans-serif', marginBottom: 12 }}>Students</h3>
          {section.students && section.students.length > 0 ? (
            <div>
              {section.students.map((s, idx) => (
                <StudentInfo key={s.regNo || idx} student={s} onEdit={handleEdit} onHistory={handleHistory} slNo={idx + 1} />
              ))}
            </div>
          ) : (
            <div style={{ color: '#888', fontStyle: 'italic' }}>No students in this section.</div>
          )}
        </>
      )}
    </div>
  );
};

export default SectionScreen;