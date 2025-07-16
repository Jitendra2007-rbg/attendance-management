import React from 'react';
import StudentHistory from '../students/StudentHistory';

const StudentHistoryPage = ({ sections }) => {
  return (
    <div>
      <StudentHistory sections={sections} />
    </div>
  );
};

export default StudentHistoryPage;
