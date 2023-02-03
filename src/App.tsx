import {
  EuiProvider,
  EuiThemeProvider,
  EuiThemeColorMode,
  EuiGlobalToastList,
} from "@elastic/eui";

import React, {useEffect, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import ThemeSelector from "./components/ThemeSelector";
import { setToasts } from "./app/slices/MeetingSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "./app/hooks";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from "./pages/VideoConference";

function App() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(zoom=>zoom.meetings.toasts);

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

  const removeToast = (removeToast:{ id: string }) => {
    dispatch(setToasts(
        toasts.filter((toast:{id:string}) => toast.id === removeToast.id)
      ));
  };

  return (
    <ThemeSelector>
      
    <EuiProvider colorMode={theme}>

      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/create1on1" element={<OneOnOneMeeting />} />
          <Route path="/createvideoconference" element={<VideoConference />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
        <EuiGlobalToastList 
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={5000}
        />
      </EuiThemeProvider>
    
    </EuiProvider>

    </ThemeSelector>
    );
}

export default App