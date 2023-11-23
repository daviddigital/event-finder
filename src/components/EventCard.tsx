import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

type EventCardProps = {
  imageUrl: string;
  eventName: string;
  eventDate: string;
  eventUrl: string;
};

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  eventName,
  eventDate,
  eventUrl,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: 1,
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={eventName}
          sx={{ height: 140 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {eventName}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {eventDate}
          </Typography>
          <Button
            component={Link}
            to={eventUrl}
            color="primary"
            variant="outlined"
          >
            More Details
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default EventCard;
