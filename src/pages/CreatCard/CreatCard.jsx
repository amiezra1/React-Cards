import { useState, useRef } from "react";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateSchema from "../../validation/cardValidation";
import { normalizeCreat } from "./normalizeCreat.js";
import ROUTES from "../../routes/ROUTES.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import toastPopup from "../../services/toastPopup.js";

const EditCardPage = () => {
  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const navigate = useNavigate();

  let keysArray = Object.keys(inputsValue);
  const errorKeysArrayRef = useRef(Object.keys(errors));
  const errorKeysArray = errorKeysArrayRef.current;

  const handleInputsChange = (e) => {
    setInputsValue((cInputsValue) => ({
      ...cInputsValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleInputsBlur = (e) => {
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (error) {
      setErrors((cErrors) => ({
        ...cErrors,
        [e.target.id]: error.details[0].message,
      }));
    } else {
      setErrors((cErrors) => {
        delete cErrors[e.target.id];
        return { ...cErrors };
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToPost = normalizeCreat(inputsValue);
    try {
      await axios.post("/cards", dataToPost);
      toast.success("Card created successfully", toastPopup.success);
      navigate(ROUTES.MYCARDS);
    } catch (error) {}
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
        <NoteAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create your card
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              autoFocus={keyName === "title"}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              required={errorKeysArray.includes(keyName)}
              errors={errors[keyName]}
            />
          ))}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default EditCardPage;
