import { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextInputComponent from "../../components/TextInputComponent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import { Link, useNavigate } from "react-router-dom";
import normalizeRegister from "./normalizeRegister";
import validateSchema from "../../validation/registerValidation";
import { toast } from "react-toastify";
import toastPopup from "../../services/toastPopup.js";

const RegisterPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [isBusiness, setIsBusiness] = useState(false);

  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const navigate = useNavigate();

  let inputsKeysArray = Object.keys(inputsValue);
  const errorKeysArrayRef = useRef(Object.keys(errors));
  const errorKeysArray = errorKeysArrayRef.current;

  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (dataFromJoi.error) {
      setErrors((copyOfErrors) => ({
        ...copyOfErrors,
        [e.target.id]: dataFromJoi.error.details[0].message,
      }));
    } else {
      setErrors((copyOfErrors) => {
        delete copyOfErrors[e.target.id];
        return { ...copyOfErrors };
      });
    }
  };

  const handleCheckChange = (e) => {
    setIsBusiness(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToPost = normalizeRegister({ ...inputsValue, isBusiness });

    try {
      await axios.post("/users", dataToPost);
      toast.success("User created successfully", toastPopup.success);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error("email already exists", toastPopup.error);
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "blue" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {inputsKeysArray.map((key) => (
            <TextInputComponent
              key={"inputs" + key}
              xs={12}
              sm={["first", "middle", "last"].includes(key) ? 4 : 12}
              id={key}
              label={key}
              autoFocus={key === "first"}
              value={inputsValue[key]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              required={errorKeysArray.includes(key)}
              errors={errors[key]}
              type={key === "password" ? "password" : "text"}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                value={isBusiness}
                color="primary"
                onChange={handleCheckChange}
                id="isBusiness"
              />
            }
            label="Business Account"
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={ROUTES.LOGIN}>{"Already have an account? Sign in"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
