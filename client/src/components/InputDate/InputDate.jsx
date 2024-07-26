import React from "react";

const InputDate = ({ onBlur, value }) => {
  const handleBlur = (e) => {
    onBlur(e.target.value);
  };
  return (
    <input
      type="date"
      onBlur={handleBlur}
      defaultValue={value}
      className="input-date"
    />
  );
};

export default InputDate;
