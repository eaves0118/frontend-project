import React from "react";
import TextField from "@mui/material/TextField";

const TextFields = ({ type = "text", label, name, formik, ...props }) => {
  const isErr = formik.touched[name] && formik.errors[name];
  const messageError = formik.errors[name];

  return (
    <>
      <TextField
        name={name}
        type={type}
        label={label}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        {...props}
      />
      {isErr && <div style={{ color: "red" }}>{messageError}</div>}
    </>
  );
};

export default TextFields;
