import React from "react";
import Typography from "@mui/material/Typography";

function LocationPage() {
  return (
    <div
      id="box"
      style={{
        display: "flex",
        flexDirection: "column", // 수직으로 정렬
        alignItems: "center", // 가운데 정렬
        width: "1000px",
        margin: "200px auto",
      }}
    >
      <Typography component="h1" variant="h5" style={{ marginBottom: "10px" }}>
        배출함 위치
      </Typography>
    </div>
  );
}

export default LocationPage;
