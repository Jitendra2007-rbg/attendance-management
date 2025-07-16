import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import AttendancePage from '../pages/AttendancePage';
import SectionAddPage from '../pages/SectionAddPage';
import SectionPage from '../pages/SectionPage';
import EditStudentPage from '../pages/EditStudentPage';
import StudentHistoryPage from '../pages/StudentHistoryPage';

// Custom route for editing student with extracted params
const EditStudentRoute = ({ sections, onSave }) => {
  const { sectionId, regNo } = useParams();
  const navigate = useNavigate();
  const section = sections.find(s => String(s.id) === sectionId);
  const student = section?.students?.find(s => String(s.regNo) === regNo);
  if (!student) return <div style={{ padding: 32 }}>Student not found.</div>;
  return (
    <EditStudentPage
      student={student}
      onSave={updated => {
        onSave(sectionId, updated);
        navigate(-1);
      }}
      onCancel={() => navigate(-1)}
    />
  );
};

const AppRoutes = ({ sections, onAddSection, onAddStudent, onAttendanceSubmit, onEditStudent }) => {
  return (
    <Routes>
      <Route path="/" element={<MainPage sections={sections} onAddStudent={onAddStudent} />} />
      <Route path="/attendance/:sectionId" element={<AttendancePage sections={sections} onAttendanceSubmit={onAttendanceSubmit} />} />
      <Route path="/add-section" element={<SectionAddPage onConfirm={onAddSection} />} />
      <Route path="/section/:sectionId" element={<SectionPage sections={sections} onAddStudent={onAddStudent} />} />
      <Route path="/edit-student/:sectionId/:regNo" element={<EditStudentRoute sections={sections} onSave={onEditStudent} />} />
      <Route path="/history/:sectionId/:regNo" element={<StudentHistoryPage sections={sections} />} />
      

    </Routes>
  );
};

export default AppRoutes;
