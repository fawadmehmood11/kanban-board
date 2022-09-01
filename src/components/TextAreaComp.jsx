import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

const TextArea = styled(TextareaAutosize)`
  width: 100%;
  margin-bottom: 5px;
  padding: 5px;
  border: none;
  outline: none;
  resize: none;
`;

const TextAreaComp = ({ value, placeholderVal, handleChange, list }) => {
  return (
    <TextArea
      value={value}
      placeholder={placeholderVal}
      onChange={handleChange}
      minRows={list ? 2 : 3}
    />
  );
};

export default TextAreaComp;
