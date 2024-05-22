import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import CssBaseline from "@mui/material/CssBaseline";
import {createContext,useMemo, useState, useContext } from "react";
import useAutoLogin from "../hooks/useAutoLogin";
import Typography from "@mui/material/Typography";
import Clock from "../components/clock/Clock";
import { Box } from "@mui/material";


const ThemeContext = createContext();

const LayoutComponent = ({ children }) => {
  const finishAutoLogin = useAutoLogin();
  const [isDarkTheme, setDarkTheme] = useState(false);

  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*white",
    favActive: "*#FB0000",
    primary: "#4E60BA",
    "background.default": "#EBEEFF",
  });

  const darkMode = useMemo(() => createTheme(themes.dark), [themes.dark]);
  const lightMode = useMemo(() => createTheme(themes.light), [themes.light]);

  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };

  const value = useMemo(() => ({
    isDarkTheme,
    handleThemeChange
  }), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
        <CssBaseline />
        <HeaderComponent
          isDarkTheme={isDarkTheme}
          onThemeChange={handleThemeChange}
        />
        <Box sx={{ position: 'sticky', top: "150px", zIndex: 1000 }}>
          <Clock/>
        </Box>
        <MainComponent>
          {finishAutoLogin ? (
            children
          ) : (
            <Typography variant="h1">Loading...</Typography>
          )}
        </MainComponent>
        <FooterComponent/>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);
export {LayoutComponent, useTheme};
