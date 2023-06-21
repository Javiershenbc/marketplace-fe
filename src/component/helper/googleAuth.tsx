import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const googleLogin = () => {
  const navigate = useNavigate();
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
        navigate("/login-success");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default googleLogin;
