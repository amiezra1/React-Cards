import { Container } from "@mui/material";
const MainComponent = ({ children }) => {
  return (
    <Container
      sx={{
        minHeight: "90vh",
      }}
    >
      {children}
    </Container>
  );
};
export default MainComponent;
