import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EmbeddedMap from "../../components/EmbeddedMap";

const LandingPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        setDataFromServer(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} xs={12}>
        <Card height={200}>
          <CardMedia
            component="img"
            height="200"
            image={dataFromServer.image.url}
            alt={dataFromServer.image.alt}
          />
          <CardContent>
            <Typography component="span" fontWeight={700}>
              more details about that business:
            </Typography>
            <Typography variant="body2">
              {dataFromServer.description}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography fontWeight={700}>Address:</Typography>
            <Typography variant="body2" color="text.secondary">
              {`${dataFromServer.address.country}, ${dataFromServer.address.city}, ${dataFromServer.address.street} ${dataFromServer.address.houseNumber} `}{" "}
            </Typography>
            <Typography fontWeight={700}>Email:</Typography>
            <Typography variant="body2" color="text.secondary">
              {`${dataFromServer.email}`}
            </Typography>
            <Typography fontWeight={700}>Phone:</Typography>
            <Typography variant="body2" color="text.secondary">
              {`${dataFromServer.phone}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xs={12}>
        <EmbeddedMap city={dataFromServer.address.city} street={dataFromServer.address.street}/>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
