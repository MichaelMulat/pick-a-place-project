import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#EB4D52",
      main: "#D12D34",
      dark: "#C4262D",
      contrastText: "#fff"
    },
    secondary: {
      light: "#8383CE",
      main: "#38398E",
      dark: "#0F162A",
      contrastText: "#fff"
    },
    accent: {
      main: "#FFFFFF"
    },
    background: {
      default: "#fff"
    }
  },

  // shape: {
  //   borderRadius: 30
  // },

  typography: {
    useNextVariants: true,
    h1: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans- serif',
      fontSize: "4rem",
      lineHeight: 1.2
    },

    h2: {
      fontFamily: '"Quicksand", "Helvetica", "Arial", sans- serif',
      fontSize: "2rem",
      lineHeight: 1.4
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700
    },
    h4: {
      color: "#fff",
      textAlign: "center"
    },

    h6: {
      fontFamily: '"Leckerli One","Helvetica", "Arial", sans- serif',
      fontSize: "2rem"
    },

    fontFamily: '"Quicksand", "Helvetica", "Arial", sans- serif'
  },

  overrides: {
    MuiButton: {
      contained: {
        borderRadius: 30,
        fontWeight: "700",
        fontSize: "1em"
      },
      outlinedSecondary: {
        backgroundColor: "#fff",
        borderRadius: 30,
        fontWeight: "500",
        fontSize: "1em"
      },
      text: {
        fontWeight: "700",
        fontSize: "1em"
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderRadius: 50
      }
    },
    MuiPaper: {}
  },
  // shadows: Array(25).fill("none")
});

console.log(theme);

export default theme;
