import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {Avatar,Button,CssBaseline,TextField,Paper,Box,Grid,Typography,Alert,} from "@mui/material";
import CopyrightComponent from "./ui/CopyrightComponent";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import LoginContext from "../../store/loginContext";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import toastPopup from "../../services/toastPopup.js";
import {
  validateEmailLogin,
  validatePasswordLogin,
} from "../../validation/loginValidation";
const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0); // State for failed login attempts
  const navigate = useNavigate();
  const { setLogin } = useContext(LoginContext);
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data);
      const decoded = jwtDecode(data);
      setLogin(decoded);
      toast.success("LoggedIn Successfully", toastPopup.success);
      navigate(ROUTES.HOME);
    } catch (err) {
      setLogin(null);
      localStorage.clear();
      setFailedLoginAttempts((prevAttempts) => prevAttempts + 1); // Increment failed login attempts
      if (failedLoginAttempts === 0) {
        toast.error(
          "Please try again later. You have three attempts",
          toastPopup.error
        );
      } else if (failedLoginAttempts === 1) {
        toast.error("You have 2 attempts left", toastPopup.error);
      } else if (failedLoginAttempts === 2) {
        toast.error(
          "You have exceeded the maximum number of login attempts.",
          toastPopup.error
        );
      } else if (failedLoginAttempts >= 3) {
        toast.error(
          "You have exceeded the maximum number of login attempts. please try again later",
          toastPopup.error
        );
      }
    }
  };
  const handleEmailBlur = () => {
    let dataFromJoi = validateEmailLogin({ email: emailValue });
    if (dataFromJoi.error) {
      setEmailError(dataFromJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };
  const handlePasswordBlur = () => {
    let dataFromJoi = validatePasswordLogin({ password: passwordValue });
    if (dataFromJoi.error) {
      setPasswordError(dataFromJoi.error.details[0].message);
    } else {
      setPasswordError("");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",          
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              autoFocus
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              id="email"
              autoComplete="email"
              value={emailValue}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            />
            {emailError && <Alert severity="error">{emailError}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordValue}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
            />
            {passwordError && <Alert severity="error">{passwordError}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!!emailError || !!passwordError}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={ROUTES.REGISTER}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <CopyrightComponent sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default LoginPage;
