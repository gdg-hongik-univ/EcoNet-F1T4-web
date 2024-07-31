import React, { useState } from "react";
import "../styles/TodayPage.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { theme } from "../theme.js";
import { ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Info from "../styles/todaypage/Info";
import DustInfo from "../components/DustInfo.js";

function TodayPage() {
  return (
    <div>
      <h2></h2>
      <DustInfo />
    </div>
  );
}
export default TodayPage;
