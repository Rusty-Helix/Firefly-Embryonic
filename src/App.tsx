import {
  EuiProvider,
  EuiThemeProvider,
  EuiThemeColorMode,
} from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.css";
import "@elastic/eui/dist/eui_theme_dark.css";
import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom"

import {
  useAppDispatch,
  useAppSelector,
} from "./app/hooks";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(zoom=>zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light")
  const [isInitialTheme, setIsInitialTheme] = useState(true)

  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if(theme) {
      setTheme(theme as EuiThemeColorMode)
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if(isInitialTheme)
    {
      setIsInitialTheme(false)
    }else {
      window.location.reload()
    }
  }, [isDarkTheme]);
  
  const overrides = {
    colors: {
      LIGHT:{primary:"#0b5cff"},
      DARK:{primary:"#0b5cff"},
    },
  };


  return (
    <EuiProvider colorMode={theme}>

      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    
    </EuiProvider>
    );
}

export default App