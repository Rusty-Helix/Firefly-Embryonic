import {
  EuiProvider,
  EuiThemeProvider,
  EuiThemeColorMode,

} from "@elastic/eui";

import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import ThemeSelector from "./components/ThemeSelector";

import {
  useAppDispatch,
  useAppSelector,
} from "./app/hooks";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";

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
    <ThemeSelector>
      
    <EuiProvider colorMode={theme}>

      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/create1on1" element={<OneOnOneMeeting />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    
    </EuiProvider>

    </ThemeSelector>
    );
}

export default App