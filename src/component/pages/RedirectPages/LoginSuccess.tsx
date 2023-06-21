// src/pages/LoginSuccess.tsx

import React from "react";
import { Container, Typography, Box } from "@mui/material";

const LoginSuccess: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Login Successful!
        </Typography>
        <Typography variant="h6">
          Welcome back, you have successfully logged in.
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginSuccess;
