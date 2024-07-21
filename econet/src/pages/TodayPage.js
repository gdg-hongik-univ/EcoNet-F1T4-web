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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#DCDDEA", // Material-UI 테마에서의 배경색
  boxShadow: 24,
  p: 4,
};

const card_dust = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        미세먼지
      </Typography>
      <Typography variant="body2">
        미세먼지 수치 데이터 표시
        <br />
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">현황 사진 보기</Button>
    </CardActions>
  </React.Fragment>
);

const card_ozone = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        오존
      </Typography>
      <Typography variant="body2">
        오존 수치 데이터 표시
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
);

const card_atm = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        대기질
      </Typography>
      <Typography variant="body2">
        대기질 수치 데이터 표시
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
);

const card_neighbor = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        나와 가까이 있는 곳은 어떨까요?
      </Typography>
      <Typography variant="body2">
        미세먼지
        <br />
        오존
        <br />
        대기질
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
);

const card_default = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        달력 자리
      </Typography>
      <Typography variant="body2">
        어렵다
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
);

const card_green = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h6" component="div">
        오늘은 미세먼지가 심각해요
      </Typography>
      <Typography variant="body2">
        미세먼지 자리는 링크로 연결하기
        <br />
      </Typography>
    </CardContent>
  </React.Fragment>
);

function TodayPage() {
  const [cardWidth, setCardWidth] = useState("200px");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        우리 동네
      </Typography>
      {/* 첫 번째 Box */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          maxWidth: "1000px",
          marginBottom: "10px",
        }}
      >
        <Card variant="outlined" style={{ width: cardWidth }}>
          {card_dust}
        </Card>
        <Card variant="outlined" style={{ width: cardWidth }}>
          {card_ozone}
        </Card>
        <Card variant="outlined" style={{ width: cardWidth }}>
          {card_atm}
        </Card>
      </Box>

      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            justifyContent: "flex-start", // 왼쪽 정렬
            marginBottom: "20px",
          }}
        >
          <Button
            onClick={handleOpen}
            variant="contained"
            color="pointColor"
            margin="normal"
          >
            미세먼지
          </Button>

          <Button
            onClick={handleOpen}
            variant="contained"
            color="pointColor"
            margin="normal"
          >
            오존
          </Button>

          <Button
            onClick={handleOpen}
            variant="contained"
            color="pointColor"
            margin="normal"
          >
            대기질
          </Button>
        </Box>

        <Modal /*수정 필요*/
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              미세먼지
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              미세먼지 그래프 보여주기
            </Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="pointColor"
              sx={{ mt: 2 }}
            >
              닫기
            </Button>
          </Box>
        </Modal>
      </ThemeProvider>

      <Typography
        component="h1"
        variant="h5"
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        이웃 동네
      </Typography>
      {/* 마진 추가 */}
      <div style={{ marginTop: "20px" }}>
        {/* 두 번째 Box */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            maxWidth: "1000px",
          }}
        >
          <Card
            variant="outlined"
            style={{ width: cardWidth, marginBottom: "10px" }}
          >
            {card_neighbor}
          </Card>
          <Card
            variant="outlined"
            style={{ width: cardWidth, marginBottom: "10px" }}
          >
            {card_default}
          </Card>
          <Card
            variant="outlined"
            style={{
              width: cardWidth,
              marginBottom: "10px",
              backgroundColor: "#e0f2f1",
            }}
          >
            {card_green}
          </Card>
        </Box>
      </div>
    </div>
  );
}
export default TodayPage;
