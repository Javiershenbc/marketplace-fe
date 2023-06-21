import React, { useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  Box,
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
import MyButton from "../elements/Button/Button";
interface PasswordRecoveryFormData {
  email: string;
}

const initialValues: PasswordRecoveryFormData = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const PasswordRecovery: React.FC = () => {
  const handleCancel = () => {
    // Handle password reset here
    console.log("Password reset");
  };
  const handlePasswordReset = (values: PasswordRecoveryFormData) => {
    // Handle login with email and password here
    console.log("Login with email and password", values);
  };
  const handleResetSMS = () => {
    // Handle password reset here
    console.log("Reset with SMS");
  };
  return (
    <Grid container direction="column" alignItems="left">
      <Typography variant="h3" alignSelf="flex-start">
        Restablece tu contraseña
      </Typography>
      <Typography variant="body1" alignSelf="flex-start" marginTop={2}>
        Utiliza un dispositivo con el que hayas iniciado sesión recientemente
        para restablecer tu contraseña.
      </Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handlePasswordReset}
      >
        {({ errors, touched }: FormikProps<PasswordRecoveryFormData>) => (
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

            <Box marginTop={2}>
              <MyButton
                variant="contained"
                text="Reestablecer contraseña"
                isFormSubmit={true}
              />
            </Box>
          </Form>
        )}
      </Formik>
      <Box marginTop={2}>
        <MyButton
          variant="outlined"
          handleClick={handleCancel}
          text="Cancelar"
          isFormSubmit={false}
        />
      </Box>

      <Link
        variant="body2"
        textAlign="center"
        marginTop="40px"
        onClick={handleResetSMS}
      >
        Restablecer mediante SMS
      </Link>
    </Grid>
  );
};

export default PasswordRecovery;
