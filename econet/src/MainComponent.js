import { BrowserRouter, Route, Routes } from "react-router-dom";
import EcoNewsPage from "./pages/EcoNewsPage.js";
import Mainpage from "./pages/Mainpage.js";

function MainComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="econews" element={<EcoNewsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MainComponent;
