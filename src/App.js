import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useSections } from './hooks/useSections';

const App = () => {
  const {
    sections,
    handleAddSection,
    handleAddStudentToSection,
    handleAttendanceSubmit,
    handleEditStudent
  } = useSections();

  return (
    <Router>
      <AppRoutes
        sections={sections}
        onAddSection={handleAddSection}
        onAddStudent={handleAddStudentToSection}
        onAttendanceSubmit={handleAttendanceSubmit}
        onEditStudent={handleEditStudent}
      />
    </Router>
  );
};

export default App;
