import { useState } from 'react';

export const useSections = () => {
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

  const handleAttendanceSubmit = (sectionId, attendance) => {
    setSections(prev => prev.map(section =>
      String(section.id) === String(sectionId)
        ? { ...section, lastAttendance: attendance }
        : section
    ));
  };

  const handleEditStudent = (sectionId, updatedStudent) => {
    setSections(prev => prev.map(section =>
      String(section.id) === String(sectionId)
        ? {
            ...section,
            students: section.students.map(s =>
              String(s.regNo) === String(updatedStudent.regNo)
                ? { ...s, ...updatedStudent }
                : s
            )
          }
        : section
    ));
  };

  return {
    sections,
    handleAddSection,
    handleAddStudentToSection,
    handleAttendanceSubmit,
    handleEditStudent
  };
};
