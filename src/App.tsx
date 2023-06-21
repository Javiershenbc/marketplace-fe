import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import LoginForm from "./component/pages/LoginForm";
import SignUpForm from "./component/pages/SignUpForm";
import PasswordRecovery from "./component/pages/PasswordRecovery";
import { theme } from "./Theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import PersonalInfoForm from "./component/pages/PersonalInfo";
import LoginSuccess from "./component/pages/RedirectPages/LoginSuccess";
import Success from "./component/pages/RedirectPages/Success";
import PersonalInfoSuccess from "./component/pages/RedirectPages/PersonalInfoSuccess";
import PasswordRecoverySuccess from "./component/pages/RedirectPages/PasswordRecoverySuccess";
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <LoginForm /> */}
        {/* <SignUpForm /> */}
        {/* <PasswordRecovery /> */}
        {/* <PersonalInfoForm /> */}
        <Router>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/passRecovery" element={<PasswordRecovery />} />
            <Route path="/personalInfo" element={<PersonalInfoForm />} />
            <Route path="/login-success" element={<LoginSuccess />} />
            <Route
              path="/passRecovery-success"
              element={<PersonalInfoSuccess />}
            />
            <Route
              path="/signUp-success"
              element={<PasswordRecoverySuccess />}
            />
            <Route path="/success" element={<Success />} />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
