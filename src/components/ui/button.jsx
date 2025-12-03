import React from "react";
import Buttons from "@mui/material/Button";

const Button = ({ content, variant = "contained", ...props }) => {
  return (
    <Buttons
      style={{ height: "45px", width: "100%", borderRadius: "30px" }}
      variant={variant}
      {...props}
    >
      {content}
    </Buttons>
  );
};

export default Button;
