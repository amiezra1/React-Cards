import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { toast } from "react-toastify";
import axios from "axios";
import LoginContext from "../../store/loginContext";
import normalizeToServer from "./normalizeToServer";
import normalizeFromServer from "./normalizeFromServer";
import validateSchema from "../../validation/registerValidation";
import ROUTES from "../../routes/ROUTES";
import TextInputComponent from "../../components/TextInputComponent";


const ProfilePage = () => {
  const [inputsValue, setInputValue] = useState({
    first: "",
    middle: "",
    last: "",
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
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  let { id } = useParams();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUpdateDetails = async ()=>{
      try {
        let { data } = await axios.get(`/users/${login._id}`);
        setInputValue(normalizeFromServer(data));
        setErrors({});
      } catch (error) {
        toast.error("❗❗❗ Something is not working!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    handleUpdateDetails();
  }, [id, login]);

  let keysArray = Object.keys(inputsValue);
  let notRequired = ["web","state","zip"]

  const handleInputsChange = (e) =>{
    setInputValue((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

   const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      await axios.put(
        "/users/" + login._id,
        normalizeToServer(inputsValue)
      );
      navigate(ROUTES.HOME)
      toast.success(" ✔ Update Successfully Your Profile!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("❗❗❗ Something is not working!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleInputsBlur = (e) =>{
    const { error } = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id] || "null",
    });
    if(error){
      setErrors((prev)=>({
        ...prev,[e.target.id]: error.details[0].message,
      }));
    }else{
      setErrors((prev)=>{
        delete prev[e.target.id];
        return {...prev}
      });
    }
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <EditNoteIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit your Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={!notRequired.includes(keyName)}
            />
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            fullWidth
            type="button"
            color="error"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            CANCEL
          </Button>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setInputValue((prevInputs) => {
                const updatedInputs = { ...prevInputs };
                Object.keys(updatedInputs).forEach((key) => {
                  updatedInputs[key] = "";
                });
                return updatedInputs;
              });
            }} 
          >
            🔄 REFRESH
          </Button>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
)};

export default ProfilePage;
