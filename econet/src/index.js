import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import MainComponent from "./MainComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <MainComponent />
  </RecoilRoot>
);
