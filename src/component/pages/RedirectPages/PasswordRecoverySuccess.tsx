// src/pages/LoginSuccess.tsx

import React from "react";
import { Container, Typography, Box } from "@mui/material";
import PasswordRecovery from "../PasswordRecovery";

const LoginSuccess: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          PasswordRecovery done successfully!
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginSuccess;
