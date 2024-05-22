import { Fragment } from "react";
import Typography from "@mui/material/Typography";

const AboutUsPage = () => {
  return (
    <Fragment>
      <Typography variant="h3" mb={3} textAlign={"center"} fontWeight="bold">
        ABOUT US
      </Typography>
      <Typography
        sx={{ lineHeight: "2rem" }}
        textAlign={"justify"}
      >
        <Typography paragraph variant="h6">
          Welcome to business card, where connecting businesses with their customers is our passion. Our platform serves as a virtual marketplace for businesses of all sizes, allowing them to create and showcase their unique business cards to a global audience.
        </Typography>
        <Typography paragraph variant="h6">
          At business card, we understand the importance of making a lasting impression. That's why we empower businesses to create eye-catching and informative business cards that reflect their brand identity and highlight their products or services. With our user-friendly interface, businesses can easily design and customize their digital business cards to stand out from the crowd. From choosing vibrant colors to adding captivating images and essential contact details, our platform provides the tools needed to create professional and memorable cards.
        </Typography>
        <Typography paragraph variant="h6">
          Whether you're a small local boutique, a bustling restaurant, or a growing online retailer, business card is here to support your journey to success. By showcasing your business card on our platform, you gain visibility among potential customers who are actively seeking products or services like yours. Our mission is to bridge the gap between businesses and consumers, fostering meaningful connections and driving growth opportunities.
        </Typography>
        <Typography paragraph variant="h6">
          We believe that every business deserves the chance to shine, and our platform serves as a catalyst for innovation and entrepreneurship. Join us at business card and discover the endless possibilities for your business. Together, let's build a vibrant community where businesses thrive and customers find the solutions they need.
        </Typography>
        <Typography paragraph variant="h6">
          Thank you for choosing business card. We look forward to being a part of your business journey.
        </Typography>
      </Typography>
      <Typography variant="h4" mt={3} textAlign={"center"} fontWeight="bold">
        We hope you enjoy our website!
      </Typography>
    </Fragment>
  );
};

export default AboutUsPage;
