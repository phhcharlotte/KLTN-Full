import React from "react";

const SelectTwoOption = ({ onChange, value, msv, option }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue={value}>
      <option value={`${msv} ${option.op1}`}>{option.op1}</option>
      <option value={`${msv} ${option.op2}`}>{option.op2}</option>
      {/* {listTeacher.map((teacher, index) => (
        <option key={index} value={`${msv} ${teacher.firstName} ${teacher.lastName}`}>
          {`${teacher.firstName} ${teacher.lastName}`}
        </option>
      ))} */}
    </select>
  );
};

export default SelectTwoOption;
