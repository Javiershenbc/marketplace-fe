import React, { useState } from "react";
import {
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
import MyButton from "../elements/Button/Button";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLogin from "../helper/googleAuth";
import "../elements/TextField/TextFieldStyles.css";
import { LoginFormData } from "../interfaces/FormData";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);

  const navigate = useNavigate();
  const handlePasswordReset = () => {
    // Handle password reset here
    navigate("/passRecovery");
  };
  const handleEmailPasswordLogin = async (values: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:4200/v1/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },

        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: "include",
      });

      if (response.status != 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const setCookieHeader = response.headers.get("accessToken");
        navigate("/login-success");

        console.log(response);
        console.log("OK ");
      }
      console.log(document.cookie);
    } catch (error) {
      console.error("Error:", error);
    }
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
                  margin="normal"
                  required
                  fullWidth
                  error={Boolean(errors.email && touched.email)}
                  helperText={<ErrorMessage name="email" />}
                  InputProps={{
                    placeholder: "Introduzca su correo electrónico",
                    style: { backgroundColor: "#FFF" }, // change the background color of the input field
                    className: "inputField", // use the class defined in the CSS file
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
                    style: { backgroundColor: "#FFF" }, // change the background color of the input field
                    className: "inputField", // use the class defined in the CSS file
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          // color="info"
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

            <Box marginTop={2}>
              <MyButton variant="contained" text="Login" isFormSubmit={true} />
            </Box>
          </Form>
        )}
      </Formik>
      <Box marginTop={2}>
        <GoogleOAuthProvider clientId="574693079056-ulpt071hl2gffe50a4ptq5125a1h00f8.apps.googleusercontent.com">
          <GoogleLogin />
        </GoogleOAuthProvider>
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
