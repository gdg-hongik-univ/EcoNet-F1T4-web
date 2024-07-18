import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Loginpage from "./pages/Loginpage";
import SettingPage from "./pages/SettingPage";
import App from "./components/App";
import { theme } from "./theme.js";
import { ThemeProvider } from "@mui/material";

function MainComponent() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Mainpage />} />
            <Route path="login">
              <Route index element={<Loginpage />} />
            </Route>
            <Route path="setting">
              <Route index element={<SettingPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MainComponent;
