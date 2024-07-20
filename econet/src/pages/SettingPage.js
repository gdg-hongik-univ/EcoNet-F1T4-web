// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthProvider";
// import styles from "./SettingPage.module.css";
// import Box from "@mui/material/Box";

import * as React from "react";
import "../styles/SettingPage.css";
import TextField from "@mui/material/TextField";
import { theme } from "../theme.js";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Container, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SettingPage() {
  /*
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  const { user, updateMe } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    await updateMe({ name, email });
    navigate("/me");
  }

  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setValues({
        name,
        email,
      });
    }
  }, [user]);
  */

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id="box">
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          프로필 설정
        </Typography>

        <TextField
          label="아이디"
          type="text"
          name="id"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          label="비밀번호"
          type="password"
          name="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <TextField
          label="이메일"
          type="email"
          name="email"
          variant="outlined"
          margin="normal"
          fullWidth
        />

        <ThemeProvider theme={theme}>
          <Button
            onClick={handleOpen}
            type="submit"
            variant="contained"
            color="pointColor"
            margin="normal"
          >
            변경하기
          </Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                label="현재 비밀번호"
                type="password"
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
              />

              <TextField
                label="새 비밀번호"
                type="password"
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
              />

              <TextField
                label="새 비밀번호 확인"
                type="password"
                name="password"
                variant="outlined"
                margin="normal"
                fullWidth
              />

              <Button
                onClick={handleOpen}
                type="submit"
                variant="outlined"
                color="pointColor"
                margin="normal"
              >
                변경완료
              </Button>
            </Box>
          </Modal>

          <Button
            type="submit"
            variant="contained"
            color="pointColor"
            margin="normal"
          >
            계정삭제
          </Button>
        </ThemeProvider>
      </Container>
    </div>
  );
}

export default SettingPage;
