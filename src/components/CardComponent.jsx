import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useTheme } from './forCardComponent/useTheme';
import { cardComponentPropTypes } from './forCardComponent/propTypes';

const CardComponent = ({
  title,
  subtitle,
  img,
  alt,
  phone,
  address,
  cardNumber,
  id,
  liked,
  onCard,
  onDelete,
  onEdit,
  onLike,
}) => {
  const handleCardClick = () => {
    onCard(id);
  };
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleEditClick = () => {
    onEdit(id);
  };
  const handleLikeClick = () => {
    onLike(id);
  };
  const { isDarkTheme } = useTheme();
  return (
    <Card raised sx={{ backgroundColor: isDarkTheme ? '#000000' : '#FFFFCC', borderColor: "black" }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia component="img" image={img} alt={alt} height={200} />
      </CardActionArea>
      <CardHeader title={title} subheader={subtitle}></CardHeader>
      <Divider></Divider>

      <CardContent>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Phone:
          </Typography>
          {phone}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Address:
          </Typography>
          {address.city}
        </Typography>
        <Typography>
          <Typography component="span" fontWeight={700}>
            Card number:
          </Typography>
          {cardNumber}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleEditClick}>
              <ModeIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={handleLikeClick}>
              <FavoriteIcon color={liked ? "error" : "inherit"} />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = cardComponentPropTypes;

export default CardComponent;