import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused fieldset": {
            borderColor: "blue", // change color when focused
            textColor: "grey",
          },
          "&.Mui-hover fieldset": {
            borderColor: "red", // change color when focused
            textColor: "grey",
          },
          "&.Mui-error fieldset": {
            borderColor: "red", // keep red color when there's an error
          },
        },
        notchedOutline: {
          borderColor: "white", // default color of outline
          //   backgroundColor: "white",
          WebkitTextStrokeColor: "#fef",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#4672ED",
    },
    secondary: {
      main: "#ff0000",
    },
    info: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: "sk-concretica",
  },
});
