import { Grid, Box, Typography } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext.js";
import { toast } from "react-toastify";
import toastPopup from "../../services/toastPopup.js";
import normalizeCard from "../HomePage/normalizeCard.js";
import searchContext from "../../store/searchContext";

const Favorite = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { search } = useContext(searchContext);

  useEffect(() => {
    axios
      .get("/cards/")
      .then(({ data }) => {
        const myLikedCards = data.filter((card) =>
          card.likes.includes(login._id)
        );
        setDataFromServer(normalizeCard(myLikedCards));
        if (search) {
          setDataFromServer((currentDataFromServer) =>
            currentDataFromServer.filter((card) =>
              card.title.toLowerCase().includes(search.toLowerCase())
            )
          );
        }
      })
      .catch((err) => {});
  }, [search, login]);

  if (!dataFromServer || !dataFromServer.length) {
    return <Typography>Could not find any liked items...</Typography>;
  }
  let dataFromServerFiltered = normalizeCard(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }
  const handleCard = (id) => {
    navigate(`${ROUTES.LANDINGPAGE}/${id}`);
  };
  const handleDeleteCard = async (id) => {
    try {
      if (login) {
        await axios.delete("/cards/" + id);
        setDataFromServer((currentDataFromServer) =>
          currentDataFromServer.filter((card) => card._id !== id)
        );
        toast.success("🚮Card deleted successfully", toastPopup.success);
      } else {
        toast.error("please login", toastPopup.error);
      }
    } catch (err) {
      toast.error("⛔It's not your card ", toastPopup.error);
    }
  };

  const handleEditCard = (id) => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        if (data.user_id === login._id) {
          navigate(`${ROUTES.EDITCARD}/${id}`);
        } else {
          toast.error("⛔It's not your card", toastPopup.error);
          navigate(ROUTES.FAVORITE);
        }
      })
      .catch((err) => {});
  };
  const handleLikeCard = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
    } catch (error) {
      toast.error("♻️Please Login", toastPopup.error);
    }
  };

  return (
    <Box>
      <Typography m={3} variant="h4" textAlign={"center"}>
        Favorites
      </Typography>
      <Grid container spacing={2}>
        {dataFromServerFiltered.map((item, index) => (
          <Grid item lg={3} md={6} xs={12} key={"Card" + index}>
            <CardComponent
              id={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item.image.url}
              alt={item.image.alt}
              phone={item.phone}
              address={item.address}
              cardNumber={item.bizNumber}
              liked={item.liked}
              onCard={handleCard}
              onDelete={handleDeleteCard}
              onEdit={handleEditCard}
              onLike={handleLikeCard}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Favorite;
