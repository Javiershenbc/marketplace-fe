import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldProps,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./LoginForm.css";

interface LoginFormData {
  email: string;
  password: string;
}

const initialValues: LoginFormData = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short.").required("Required"),
});

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleGoogleLogin = () => {
    // Handle login with Google here
    console.log("Login with Google");
  };
  const handlePasswordReset = () => {
    // Handle password reset here
    console.log("Password reset");
  };
  const handleEmailPasswordLogin = (values: LoginFormData) => {
    // Handle login with email and password here
    console.log("Login with email and password", values);
  };
  const handlePoliticas = () => {
    // Handle login with Google here
    console.log("Politicas de privacidad");
  };
  const handleRegister = () => {
    // Handle login with Google here
    console.log("Register");
  };
  return (
    <Grid container direction="column" alignItems="left">
      <Typography variant="h3" alignSelf="flex-start">
        Login
      </Typography>
      <Typography variant="h6" alignSelf="flex-start" marginTop={2}>
        Ingrese sus datos para comenzar
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleEmailPasswordLogin}
      >
        {({ errors, touched }: FormikProps<LoginFormData>) => (
          <Form>
            <Typography variant="body2" textAlign="left" marginTop={2}>
              Correo electrónico
            </Typography>
            <Field name="email">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  type="email"
                  variant="outlined"
                  color="primary"
                  margin="normal"
                  required
                  fullWidth
                  error={Boolean(errors.email && touched.email)}
                  helperText={<ErrorMessage name="email" />}
                  InputProps={{
                    placeholder: "Introduzca su correo electrónico",

                    style: { color: "#D5D5D5" }, // color of text
                    // inputProps: {
                    //   style: {
                    //     color: "white", // color of input text
                    //     "&::placeholder": {
                    //       color: "white", // color of placeholder
                    //     },
                    //   },
                    // },
                  }}
                />
              )}
            </Field>
            <Typography variant="body2" textAlign="left">
              Contraseña
            </Typography>
            <Field name="password">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  error={Boolean(errors.password && touched.password)}
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{
                    placeholder: "Introduzca su contraseña",
                    style: { color: "#D5D5D5" }, // color of text
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    // inputProps: {
                    //   style: {
                    //     color: "white", // color of input text
                    //     "::placeholder": {
                    //       color: "white", // color of placeholder
                    //     },
                    //   },
                    // },
                  }}
                />
              )}
            </Field>
            {/* <Box width="100%"> */}
            <Link
              component="button"
              variant="body2"
              onClick={handlePasswordReset}
              width="100%"
              style={{
                textAlign: "left",
                color: "#4672ED",
                textDecoration: "none",
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
            {/* </Box> */}
            <Box marginTop={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleGoogleLogin}
          style={{
            color: "#fff",
          }}
        >
          Login with Google
        </Button>
      </Box>
      <Typography
        variant="body2"
        textAlign="center"
        style={{
          color: "#9A9A9A",
        }}
        marginTop={2}
      >
        Crea una cuenta gratis. <Link onClick={handleRegister}>Registrate</Link>
      </Typography>
      <Link variant="body2" textAlign="center" onClick={handlePoliticas}>
        Política de privacidad
      </Link>
    </Grid>
  );
};

export default LoginForm;
