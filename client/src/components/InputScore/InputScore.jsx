import React from "react";

const InputScore = ({ onBlur, value }) => {
  const handleBlur = (e) => {
    onBlur(e.target.value);
  };
  return (
    <input
      type="number"
      min="0"
      max="10"
      onBlur={handleBlur}
      defaultValue={value}
    />
  );
};

export default InputScore;
