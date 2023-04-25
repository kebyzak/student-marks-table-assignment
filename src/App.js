import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const studentData = data.map((student, index) => {
          return {
            id: index + 1,
            name: student.name,
            marks: [
              Math.floor(Math.random() * 101),
              Math.floor(Math.random() * 101),
              Math.floor(Math.random() * 101),
              Math.floor(Math.random() * 101),
              Math.floor(Math.random() * 101),
            ],
          };
        });
        setStudents(studentData);
      });
  }, []);

  const calculateAverage = (marks) => {
    const totalMarks = marks.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    return Math.round(totalMarks / marks.length);
  };

  const renderTableHeader = () => {
    const subjects = ["Subject 1", "Subject 2", "Subject 3", "Subject 4", "Subject 5"];
    const header = ["ID", "Name", ...subjects, "Result"];
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return students.map((student) => {
      const average = calculateAverage(student.marks);
      const result = average < 40 ? "Fail" : "Pass";
      return (
        <tr key={student.id}>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.marks[0]}</td>
          <td>{student.marks[1]}</td>
          <td>{student.marks[2]}</td>
          <td>{student.marks[3]}</td>
          <td>{student.marks[4]}</td>
          <td>{result}</td>
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <h1>Student Results</h1>
      <table>
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    </div>
  );
}

export default App;
