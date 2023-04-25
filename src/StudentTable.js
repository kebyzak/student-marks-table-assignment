// src/StudentTable.js

import React, { useState, useEffect } from 'react';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // fetch the student data from the API
    fetch('http://localhost:4000/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="student-table">
      <h2>Student Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Subject 1</th>
            <th>Subject 2</th>
            <th>Subject 3</th>
            <th>Subject 4</th>
            <th>Subject 5</th>
            <th>Average</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              {student.marks.map((mark, index) => (
                <td key={index}>{mark}</td>
              ))}
              <td>{Math.round(student.marks.reduce((a, b) => a + b) / 5)}</td>
              <td>{Math.round(student.marks.reduce((a, b) => a + b) / 5) < 40 ? 'Fail' : 'Pass'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
