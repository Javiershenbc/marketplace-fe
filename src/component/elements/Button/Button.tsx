import React from "react";
import { Button, ButtonProps } from "@mui/material";
import "./Button.css";
interface MyButtonProps {
  text: string;
  handleClick?: () => void;
  variant?: "text" | "outlined" | "contained";
  isFormSubmit?: Boolean;
  size?: "small" | "medium" | "large";
}

const MyButton: React.FC<MyButtonProps> = ({
  text,
  handleClick,
  variant,
  isFormSubmit,
  size,
}) => {
  return isFormSubmit ? (
    <Button
      variant={variant}
      type="submit"
      fullWidth
      style={{
        color: "#fff",
      }}
      size={size}
    >
      {text}
    </Button>
  ) : (
    <Button
      variant={variant}
      onClick={handleClick}
      fullWidth
      style={{
        color: "#fff",
      }}
      size={size}
    >
      {text}
    </Button>
  );
};

export default MyButton;
