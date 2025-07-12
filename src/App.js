import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import MainScreen from './components/screens/MainScreen';
import AttendanceScreen from './components/screens/AttendanceScreen';
import SectionAddScreen from './components/screens/SectionAddScreen';
import SectionScreen from './components/screens/SectionScreen';
import EditStudentScreen from './components/screens/EditStudentScreen';
import StudentHistoryScreen from './components/screens/StudentHistoryScreen';

// Helper to render EditStudentScreen with correct student
const EditStudentRoute = ({ sections, onSave }) => {
  const { sectionId, regNo } = useParams();
  const navigate = useNavigate();
  const section = sections.find(s => String(s.id) === sectionId);
  const student = section?.students?.find(s => String(s.regNo) === regNo);
  if (!student) return <div style={{padding: 32}}>Student not found.</div>;
  return (
    <EditStudentScreen
      student={student}
      onSave={updated => { onSave(sectionId, updated); navigate(-1); }}
      onCancel={() => navigate(-1)}
    />
  );
};

const App = () => {
  const [sections, setSections] = useState([]);

  const handleAddSection = (section) => {
    setSections(prev => [...prev, { ...section, id: Date.now() }]);
  };

  const handleAddStudentToSection = (sectionIdx, student) => {
    setSections(prev => prev.map((section, idx) =>
      idx === sectionIdx
        ? { ...section, students: [...(section.students || []), student] }
        : section
    ));
  };

  // Store last attendance result per section
  const handleAttendanceSubmit = (sectionId, attendance) => {
    setSections(prev => prev.map(section =>
      String(section.id) === String(sectionId)
        ? { ...section, lastAttendance: attendance }
        : section
    ));
  };

  // Save updated student info
  const handleEditStudent = (sectionId, updatedStudent) => {
    setSections(prev => prev.map(section =>
      String(section.id) === String(sectionId)
        ? {
            ...section,
            students: section.students.map(s =>
              String(s.regNo) === String(updatedStudent.regNo) ? { ...s, ...updatedStudent } : s
            )
          }
        : section
    ));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen sections={sections} onAddStudent={handleAddStudentToSection} />} />
        <Route path="/attendance/:sectionId" element={<AttendanceScreen sections={sections} onAttendanceSubmit={handleAttendanceSubmit} />} />
        <Route path="/add-section" element={<SectionAddScreen onConfirm={handleAddSection} />} />
        <Route path="/section/:sectionId" element={<SectionScreen sections={sections} onAddStudent={handleAddStudentToSection} />} />
        <Route path="/edit-student/:sectionId/:regNo" element={<EditStudentRoute sections={sections} onSave={handleEditStudent} />} />
        <Route path="/history/:sectionId" element={<StudentHistoryScreen sections={sections} /*onHistory={handleHistoryStudent}*//>} />
      </Routes>
    </Router>
  );
};

export default App;