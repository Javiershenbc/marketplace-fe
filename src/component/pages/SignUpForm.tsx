import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Checkbox,
  IconButton,
  InputAdornment,
  LinearProgress,
  FormControlLabel,
  Link,
} from "@mui/material";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikProps,
  FieldProps,
} from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import zxcvbn from "zxcvbn";
import MyButton from "../elements/Button/Button";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const initialValues: SignUpFormData = {
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password is too short.").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), "null"], "Passwords must match")
    .required("Required"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Accept Terms & Conditions is required"
  ),
});

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailPasswordSignUp = async (values: SignUpFormData) => {
    try {
      console.log(values);
      const response = await fetch("http://localhost:4200/v1/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.status != 201) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleAcuerdoDeUsuario = () => {
    // Handle acuerdo de usuario here
    console.log("Acuerdo de usuario");
  };
  const handlePoliticas = () => {
    // Handle politicas here
    console.log("Politicas de privacidad");
  };

  return (
    <Grid container direction="column" alignItems="left">
      <Typography variant="h3" alignSelf="flex-start">
        Sign Up
      </Typography>
      <Typography variant="h6" alignSelf="flex-start" marginTop={2}>
        Ingrese sus datos para registrarse
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleEmailPasswordSignUp}
      >
        {({ errors, touched, values }: FormikProps<SignUpFormData>) => (
          <Form>
            <Typography variant="body1" textAlign="left">
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

                    style: { color: "#D5D5D5" },
                  }}
                />
              )}
            </Field>

            <Typography variant="body1" textAlign="left">
              Contraseña
            </Typography>
            <Field name="password">
              {({ field }: FieldProps) => {
                const password = field.value;
                const passwordData = zxcvbn(field.value);
                let passwordStrength = 0;

                if (passwordData.score > 0 && password.length >= 8) {
                  passwordStrength = 1; // password length is 8 or more
                }
                if (passwordStrength >= 1 && /[A-Z]/.test(password)) {
                  passwordStrength++; // password has capital letters and numbers
                }
                if (passwordStrength >= 1 && /[0-9]/.test(password)) {
                  passwordStrength++; // password has capital letters and numbers
                }
                if (
                  passwordStrength >= 1 &&
                  /[!@#$%^&*(),.?":{}|<>]/.test(password)
                ) {
                  passwordStrength++; // password has special characters
                }
                let color = "#D5D5D5";
                // let progressColor = "warning";
                let passwordStrengthString = "Very weak";
                if (passwordStrength === 1) {
                  //   color = "warning";
                  //   progressColor = "error";
                  passwordStrengthString = "Weak";
                } else if (passwordStrength === 2) {
                  //   progressColor = "warning";
                  // color = "#FFFF00";
                  passwordStrengthString = "Medium";
                } else if (passwordStrength === 3) {
                  //   progressColor = "success";
                  //color = "#008000";
                  passwordStrengthString = "Good";
                } else if (passwordStrength === 4) {
                  //   progressColor = "success";
                  //color = "#006400";
                  passwordStrengthString = "Strong";
                }

                return (
                  <>
                    <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      error={Boolean(
                        (errors.password && touched.password) ||
                          passwordStrength < 2
                      )}
                      helperText={
                        "Password is too weak." || (
                          <ErrorMessage name="password" />
                        )
                      }
                      InputProps={{
                        placeholder: "Introduzca su contraseña",
                        style: { color: "#D5D5D5" },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              color="info"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <LinearProgress
                      variant="determinate"
                      value={passwordStrength * 25}
                      //   color={progressColor}
                      style={{
                        backgroundColor: color,
                        height: "10px",

                        marginTop: "5px",
                      }}
                    />
                    <Typography variant="body2" textAlign="left">
                      {passwordStrengthString}
                    </Typography>
                  </>
                );
              }}
            </Field>

            <Typography variant="body1" textAlign="left">
              Confirmar Contraseña
            </Typography>
            <Field
              as={TextField}
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              error={errors.confirmPassword && touched.confirmPassword}
              helperText={<ErrorMessage name="confirmPassword" />}
              InputProps={{
                placeholder: "Confirme su contraseña",

                style: { color: "#D5D5D5" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      color="info"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Field name="acceptTerms">
              {({ field }: FieldProps) => (
                <FormControlLabel
                  control={<Checkbox {...field} style={{ color: "#fff" }} />}
                  label={
                    <Typography
                      variant="body2"
                      maxWidth="250px"
                      style={{ color: "#9A9A9A" }}
                    >
                      Certifico que tengo 18 años de edad o más y acepto el{" "}
                      <Link onClick={handleAcuerdoDeUsuario}>
                        Acuerdo de usuario
                      </Link>{" "}
                      y la{" "}
                      <Link onClick={handlePoliticas}>
                        Política de privacidad
                      </Link>
                    </Typography>
                  }
                />
              )}
            </Field>
            {errors.acceptTerms && touched.acceptTerms && (
              <Typography variant="body2" color="error">
                Es necesario aceptar los terminos y condiciones de la
                plataforma.
              </Typography>
            )}

            <Box marginTop={2}>
              <MyButton isFormSubmit={true} text="SignUp" variant="contained" />
            </Box>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

export default SignUpForm;
