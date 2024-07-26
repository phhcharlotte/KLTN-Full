import React from "react";
import "./RgtStudentItem.css";

const RgtStudentItem = ({ index, studentCode, id, handleDeleteStudent, deleteStudentStatusRequest }) => {
  return (
    <div className="student-item">
      <p>{studentCode}</p>
      <button
        className="delete-student-btn"
        onClick={() => {
          handleDeleteStudent(id, studentCode, index);
          deleteStudentStatusRequest(studentCode);
        }}
      >
        <i className="bx bx-trash"></i>
        Xoá
      </button>
    </div>
  );
};

export default RgtStudentItem;
