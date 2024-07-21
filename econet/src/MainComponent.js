import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Loginpage from "./pages/Loginpage";
import SettingPage from "./pages/SettingPage";
import TodayPage from "./pages/TodayPage";
import LocationPage from "./pages/LocationPage.js";
import EcoNewsPage from "./pages/EcoNewsPage.js";
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
            <Route path="today">
              <Route index element={<TodayPage />} />
            </Route>
            <Route path="location">
              <Route index element={<LocationPage />} />
            </Route>
            <Route path="econews">
              <Route index element={<EcoNewsPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default MainComponent;
