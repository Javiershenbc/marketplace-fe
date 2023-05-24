import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import LoginForm from "./component/pages/LoginForm/LoginForm";
import { theme } from "./Theme";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
