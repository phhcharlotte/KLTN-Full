import React from "react";

const SelectCouncil = ({ listTeacher, onChange, value, msv }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={handleChange} defaultValue={value}>
      <option value={`${msv} Không`}></option>

      {listTeacher.map((teacher, index) => (
        <option
          key={index}
          value={`${msv} ${teacher.firstName} ${teacher.lastName}`}>
          {`${teacher.firstName} ${teacher.lastName}`}
        </option>
      ))}
    </select>
  );
};

export default SelectCouncil;
