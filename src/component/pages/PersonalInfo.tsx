import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import MyButton from "../elements/Button/Button";
import "../elements/Select/Select.css";
import { PersonalInfoData } from "../interfaces/FormData";
import PersonalInfoFormOptions from "../jsonData/PersonalInfoFormOptions.json";
import countries from "../jsonData/countries/es/countries.json";
import { useCookies } from "react-cookie";

const initialValues: PersonalInfoData = {
  name: "",
  surname: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  nationalityCountry: "",
  documentType: "",
  documentNumber: "",
  residenceCountry: "",
  telephonePrefix: "",
  telephoneNumber: "",
  address: "",
  postalCode: "",
  isPublicOfficer: "",
  currentPosition: "",
  currentEntity: "",
  positionType: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  birthDay: Yup.string().required("Required"),
  birthMonth: Yup.string().required("Required"),
  birthYear: Yup.string().required("Required"),
  nationalityCountry: Yup.string().required("Required"),
  documentType: Yup.string().required("Required"),
  documentNumber: Yup.string().required("Required"),
  residenceCountry: Yup.string().required("Required"),
  telephonePrefix: Yup.string().required("Required"),
  telephoneNumber: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
  // isPublicOfficer: Yup.string().required("Required"),
  currentPosition: Yup.string().notRequired(),
  //   currentPosition: Yup.string().when("isPublicOfficer", {
  //     is: true,
  //     then: Yup.string().required("Field is required"),
  //     otherwise: Yup.string().notRequired(),
  //   }),
  currentEntity: Yup.string().notRequired(),
  positionType: Yup.string().notRequired(),
});

const PersonalInfoForm: React.FC = () => {
  const documentTypes = ["NIE", "NIF", "IDA"];
  const phonePrefixes = ["+34", "+33" /* Other prefixes... */];
  const [formStep, setFormStep] = useState(0);
  const [cookies] = useCookies(["jwt"]);
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;

    const parts = value.split(`; ${name}=`);
    if (parts === undefined) return;
    if (parts.length === 2) {
      const lastPart = parts.pop();
      if (lastPart) {
        return lastPart.split(";").shift();
      }
    }
  }
  // Handle submit function here...
  const handleSubmit = async (values: PersonalInfoData) => {
    console.log(formStep);
    if (formStep < 2) {
      console.log(formStep);

      setFormStep(formStep + 1);
    } else {
      //console.log(values);
      //Format birthDate
      // let birthDate = `${values.birthYear}-${values.birthMonth}-${values.birthDay}`;
      //Format isPublicOfficer
      // let isPublicOfficer = values.isPublicOfficer === "Yes" ? true : false;
      //API request

      try {
        let body = {
          name: values.name,
          surname: values.surname,
          birthDate: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
          nationalityCountry: values.nationalityCountry,
          residenceCountry: values.residenceCountry,
          telephonePrefix: values.telephonePrefix,
          telephone: values.telephoneNumber,
          address: values.address,
          postalCode: values.postalCode,
          documentType: values.documentType,
          document: values.documentType,
          isPublicOfficer: values.isPublicOfficer === "Yes" ? true : false,
          actualPosition: values.currentPosition,
          //¿?¿?
          organization: values.currentEntity,
          positionType: values.positionType,
        };
        let cookies = getCookie("accessToken");
        const response = await fetch(
          "http://localhost:4200/v1/verifier/identity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              Authorization: `Bearer ${cookies}`,
            },
            body: JSON.stringify(body),
            credentials: "include",
          }
        );

        if (response.status != 201) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    /*Part 1 */
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          {formStep === 0 && (
            <Grid container direction="column" alignItems="left">
              <Typography variant="h3" alignSelf="flex-start">
                Personal Information
              </Typography>
              <Typography variant="h6" alignSelf="flex-start" marginTop={2}>
                Ingrese sus datos personales
              </Typography>
              <Grid container spacing={1} columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" textAlign="left">
                    Nombre
                  </Typography>
                  <Field name="name">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={Boolean(
                          formik.errors.name && formik.touched.name
                        )}
                        helperText={<ErrorMessage name="name" />}
                        InputProps={{
                          placeholder: "Su nombre",
                          style: {
                            color: "#000000",
                            backgroundColor: "#FFF",
                          },
                        }}
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" textAlign="left">
                    Apellidos
                  </Typography>
                  <Field name="surname">
                    {({ field }: FieldProps) => (
                      <TextField
                        {...field}
                        type="text"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={Boolean(
                          formik.errors.surname && formik.touched.surname
                        )}
                        helperText={<ErrorMessage name="surname" />}
                        InputProps={{
                          placeholder: "Su apellido",
                          style: {
                            color: "#000000",
                            backgroundColor: "#FFF",
                          },
                        }}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" textAlign="left">
                        Fecha de nacimiento
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Field name="birthDay">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            variant="outlined"
                            error={Boolean(
                              formik.errors.birthDay && formik.touched.birthDay
                            )}
                            fullWidth
                          >
                            {field.value === "" ? (
                              <InputLabel id="birthDay-label" shrink={false}>
                                Día
                              </InputLabel>
                            ) : (
                              <InputLabel id="birthDay-label"></InputLabel>
                            )}
                            <Select
                              {...field}
                              fullWidth
                              className="selectInput selectOutlined selectPaper selectHover selectFocus"
                              variant="outlined"
                              labelId="birthDay-label"
                            >
                              {Array.from({ length: 31 }, (_, i) => i + 1).map(
                                (day, index) => (
                                  <MenuItem key={index} value={day}>
                                    {day}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                            <FormHelperText filled={false}>
                              <ErrorMessage name="birthDay" />
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Field name="birthMonth">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            variant="outlined"
                            error={Boolean(
                              form.errors.birthMonth && form.touched.birthMonth
                            )}
                            fullWidth
                          >
                            {field.value == "" ? (
                              <InputLabel id="birthMonth-label" shrink={false}>
                                Mes
                              </InputLabel>
                            ) : (
                              <InputLabel id="birthMonth-label"></InputLabel>
                            )}
                            <Select
                              {...field}
                              className="selectInput selectOutlined selectPaper selectHover selectFocus"
                              fullWidth
                              variant="outlined"
                              labelId="birthMonth-label"
                            >
                              {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                (day, index) => (
                                  <MenuItem key={index} value={day}>
                                    {day}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                            <FormHelperText>
                              <ErrorMessage name="birthMonth" />
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Field name="birthYear">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            variant="outlined"
                            error={Boolean(
                              form.errors.birthYear && form.touched.birthYear
                            )}
                            fullWidth
                          >
                            {field.value == "" ? (
                              <InputLabel id="birthYear-label" shrink={false}>
                                Año
                              </InputLabel>
                            ) : (
                              <InputLabel id="birthYear-label"></InputLabel>
                            )}
                            <Select
                              {...field}
                              fullWidth
                              className="selectInput selectOutlined selectPaper selectHover selectFocus"
                              variant="outlined"
                              labelId="birthYear-label"
                            >
                              {Array.from(
                                { length: 100 },
                                (_, i) => new Date().getFullYear() - i
                              ).map((year, index) => (
                                <MenuItem key={index} value={year}>
                                  {year}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              <ErrorMessage name="birthYear" />
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" textAlign="left">
                    País
                  </Typography>
                  <Field name="nationalityCountry">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        variant="outlined"
                        error={Boolean(
                          form.errors.nationalityCountry &&
                            form.touched.nationalityCountry
                        )}
                        fullWidth
                        margin="normal"
                      >
                        {field.value == "" ? (
                          <InputLabel
                            id="nationalityCountry-label"
                            shrink={false}
                          >
                            País
                          </InputLabel>
                        ) : (
                          <InputLabel id="nationalityCountry-label"></InputLabel>
                        )}
                        <Select
                          {...field}
                          className="selectInput selectOutlined selectPaper selectHover selectFocus"
                          fullWidth
                          variant="outlined"
                          labelId="nationalityCountry-label"
                        >
                          {countries.map((country, index) => (
                            <MenuItem key={index} value={country.name}>
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          <ErrorMessage name="nationalityCountry" />
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" textAlign="left">
                        Documento de Identidad
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sm={4}>
                      <Field name="documentType">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            variant="outlined"
                            error={Boolean(
                              form.errors.documentType &&
                                form.touched.documentType
                            )}
                            fullWidth
                          >
                            {field.value == "" ? (
                              <InputLabel
                                id="documentType-label"
                                shrink={false}
                              >
                                Tipo de documento
                              </InputLabel>
                            ) : (
                              <InputLabel id="documentType-label"></InputLabel>
                            )}
                            <Select
                              {...field}
                              fullWidth
                              className="selectInput selectOutlined selectPaper selectHover selectFocus"
                              variant="outlined"
                              labelId="documentType-label"
                            >
                              {documentTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              <ErrorMessage name="documentType" />
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={8} sm={8}>
                      <Field
                        name="documentNumber"
                        as={TextField}
                        fullWidth
                        variant="outlined"
                        error={Boolean(
                          formik.errors.documentNumber &&
                            formik.touched.documentNumber
                        )}
                        helperText={<ErrorMessage name="documentNumber" />}
                        InputProps={{
                          placeholder: "Número de documento",
                          style: { backgroundColor: "#FFF" }, // change the background color of the input field
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" textAlign="left">
                    País de residencia
                  </Typography>
                  <Field name="residenceCountry">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        variant="outlined"
                        error={Boolean(
                          form.errors.residenceCountry &&
                            form.touched.residenceCountry
                        )}
                        fullWidth
                        margin="normal"
                      >
                        {field.value === "" ? (
                          <InputLabel id="residenceCountry-label">
                            País de residencia
                          </InputLabel>
                        ) : (
                          <InputLabel id="residenceCountry-label"></InputLabel>
                        )}
                        <Select
                          {...field}
                          className="selectInput selectOutlined selectPaper selectHover selectFocus"
                          fullWidth
                          variant="outlined"
                          labelId="residenceCountry-label"
                        >
                          {countries.map((country, index) => (
                            <MenuItem key={index} value={country.name}>
                              <img src={`/flags/16x16/${country.alpha2}.png`} />{" "}
                              {country.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          <ErrorMessage name="residenceCountry" />
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" textAlign="left">
                        Número de teléfono
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Field name="telephonePrefix">
                        {({ field, form }: FieldProps) => (
                          <FormControl
                            variant="outlined"
                            error={Boolean(
                              form.errors.telephonePrefix &&
                                form.touched.telephonePrefix
                            )}
                            fullWidth
                          >
                            {field.value == "" ? (
                              <InputLabel id="telephonePrefix-label">
                                Prefijo
                              </InputLabel>
                            ) : (
                              <InputLabel id="telephonePrefix-label"></InputLabel>
                            )}
                            <Select
                              {...field}
                              className="selectInput selectOutlined selectPaper selectHover selectFocus"
                              fullWidth
                              variant="outlined"
                              labelId="telephonePrefix-label"
                            >
                              {phonePrefixes.map((prefix, index) => (
                                <MenuItem key={index} value={prefix}>
                                  {prefix}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              <ErrorMessage name="telephonePrefix" />
                            </FormHelperText>
                          </FormControl>
                        )}
                      </Field>
                    </Grid>

                    <Grid item xs={8} sm={8}>
                      <Field
                        name="telephoneNumber"
                        as={TextField}
                        fullWidth
                        variant="outlined"
                        error={Boolean(
                          formik.errors.telephoneNumber &&
                            formik.touched.telephoneNumber
                        )}
                        helperText={<ErrorMessage name="telephoneNumber" />}
                        InputProps={{
                          placeholder: "Número de teléfono",

                          style: { backgroundColor: "#FFF" }, // change the background color of the input field
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" textAlign="left">
                    Dirección
                  </Typography>
                  <Field
                    name="address"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    error={Boolean(
                      formik.errors.address && formik.touched.address
                    )}
                    helperText={<ErrorMessage name="address" />}
                    InputProps={{
                      placeholder: "Dirección",
                      style: { backgroundColor: "#FFF" }, // change the background color of the input field
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" textAlign="left">
                    Código postal
                  </Typography>
                  <Field
                    name="postalCode"
                    as={TextField}
                    margin="normal"
                    fullWidth
                    error={Boolean(
                      formik.errors.postalCode && formik.touched.postalCode
                    )}
                    variant="outlined"
                    helperText={<ErrorMessage name="postalCode" />}
                    InputProps={{
                      placeholder: "Código Postal",

                      style: { backgroundColor: "#FFF" }, // change the background color of the input field
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box margin="normal" width="100%" height="100%" marginTop={6}>
                    <MyButton
                      variant="contained"
                      isFormSubmit={true}
                      text="Continue"
                      size="large"
                    ></MyButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
          {formStep === 1 && (
            <Grid container alignItems="center" maxWidth={900}>
              <Typography variant="h4" textAlign="center">
                Persona de responsabilidad pública
              </Typography>
              <Typography variant="h5">
                Ingrese sus datos para completar el proceso de acreditación
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" textAlign="left">
                    ¿Es una persona de responsabilidad pública?
                  </Typography>
                  <Field name="isPublicOfficer">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        variant="outlined"
                        error={Boolean(
                          form.errors.isPublicOfficer &&
                            form.touched.isPublicOfficer
                        )}
                        className="selectInput selectOutlined selectPaper selectHover selectFocus"
                        fullWidth
                      >
                        <InputLabel id="isPublicOfficer-label"></InputLabel>
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                          labelId="isPublicOfficer-label"
                        >
                          <MenuItem value="Yes">Sí</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                        <FormHelperText>
                          <ErrorMessage name="isPublicOfficer" />
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" textAlign="left">
                    Cargo actual o anterior
                  </Typography>
                  <Field
                    name="currentPosition"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="currentPosition" />}
                    InputProps={{
                      style: { backgroundColor: "#FFF" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" textAlign="left">
                    Entidad actual o anterior
                  </Typography>
                  <Field
                    name="currentEntity"
                    as={TextField}
                    fullWidth
                    variant="outlined"
                    helperText={<ErrorMessage name="currentEntity" />}
                    InputProps={{
                      style: { backgroundColor: "#FFF" },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2" textAlign="left">
                    Tipología
                  </Typography>
                  <Field name="positionType">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        variant="outlined"
                        error={Boolean(
                          form.errors.positionType && form.touched.positionType
                        )}
                        className="selectInput selectOutlined selectPaper selectHover selectFocus"
                        fullWidth
                      >
                        <InputLabel id="positionType-label"></InputLabel>
                        <Select
                          {...field}
                          fullWidth
                          variant="outlined"
                          labelId="positionType-label"
                        ></Select>
                        <FormHelperText>
                          <ErrorMessage name="positionType" />
                        </FormHelperText>
                      </FormControl>
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Box margin="normal" width="100%" height="100%" marginTop={6}>
                    <MyButton
                      variant="contained"
                      isFormSubmit={true}
                      text="Continue"
                      size="large"
                    ></MyButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
          {formStep === 2 && (
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h3" textAlign="left">
                  Verifica tus datos
                </Typography>
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <Typography variant="h6" textAlign="left">
                  ¿Es correcta esta información?
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="body1" textAlign="left">
                  Name:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Country:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Tipo de documento:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Número de documento:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  País de residencia:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Prefijo telefónico:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Número de teléfono:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Dirección:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  Código postal:
                </Typography>
                <Typography variant="body1" textAlign="left">
                  ¿Es una persona de responsabilidad pública?:
                </Typography>
                {formik.values.currentPosition != "" && (
                  <Typography variant="body1" textAlign="left">
                    Cargo actual o anterior:
                  </Typography>
                )}
                {formik.values.currentEntity != "" && (
                  <Typography variant="body1" textAlign="left">
                    Entidad actual o anterior:
                  </Typography>
                )}
                {formik.values.positionType != "" && (
                  <Typography variant="body1" textAlign="left">
                    Tipología:
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="body1" textAlign="left">
                  {formik.values.name}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.nationalityCountry}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.documentType}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.documentNumber}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.residenceCountry}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.telephonePrefix}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.telephoneNumber}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.address}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.postalCode}
                </Typography>
                <Typography variant="body1" textAlign="left">
                  {formik.values.isPublicOfficer ? "Sí" : "No"}
                </Typography>
                {formik.values.currentPosition != "" && (
                  <Typography variant="body1" textAlign="left">
                    {formik.values.currentPosition}
                  </Typography>
                )}
                {formik.values.currentEntity != "" && (
                  <Typography variant="body1" textAlign="left">
                    {formik.values.currentEntity}
                  </Typography>
                )}
                {formik.values.positionType != "" && (
                  <Typography variant="body1" textAlign="left">
                    {formik.values.positionType}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box margin="normal" width="100%" height="100%" marginTop={6}>
                  <MyButton
                    variant="contained"
                    isFormSubmit={true}
                    text="Submit"
                    size="large"
                  ></MyButton>
                </Box>
              </Grid>
            </Grid>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfoForm;
