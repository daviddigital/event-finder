import { useContext, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EventsContext from "../context/EventsContext";
import api from "../api/api";
import { EventDetails } from "../types";
import countries from "../utils/countries";
import EventCard from "../components/EventCard";

const Home = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("Home must be used within an EventsContext.Provider");
  }
  const { state, dispatch } = context;
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [location, setLocation] = useState("");

  const fetchEvents = async () => {
    dispatch({ type: "LOAD_EVENTS" });
    try {
      const response = await api.get("", {
        params: {
          page: state.currentPage,
          startDateTime: formatDate(startDate),
          endDateTime: formatDate(endDate, true),
          countryCode: location,
        },
      });

      if (response.data._embedded && response.data._embedded.events) {
        const events = response.data._embedded.events as EventDetails[];
        const totalPages = response.data.page.totalPages;
        dispatch({ type: "SET_EVENTS", payload: { events, totalPages } });
      } else {
        console.error("No events found in the response");
        dispatch({
          type: "SET_EVENTS",
          payload: { events: [], totalPages: 0 },
        });
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const formatDate = (date: string, addDay: boolean = false) => {
    const newDate = new Date(date);

    // add a day if if its the endDate as setting to midnight UTC
    if (addDay) {
      newDate.setDate(newDate.getDate() + 1);
    }

    // date must be of format YYYY-MM-DDTHH:mm:ssZ (e.g. 2021-10-01T00:00:00Z)
    // cut off the milliseconds
    return newDate.toISOString().replace(/\.\d{3}Z$/, "Z");
  };

  const handleSearch = () => {
    dispatch({ type: "RESET_EVENTS" });
    fetchEvents();
  };

  const handleLoadMore = () => {
    fetchEvents();
  };

  return (
    <Container sx={{ padding: "24px" }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Find Events
      </Typography>
      <Box component="form" sx={{ marginBottom: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ marginRight: 1 }}
        />
        <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ marginRight: 1, minWidth: 120 }}
        >
          {countries.map((country) => (
            <MenuItem key={country.code} value={country.code}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={state.loading}
        >
          {state.loading ? <CircularProgress /> : "Search"}
        </Button>
        {state.events.length === 0 && state.currentPage ? (
          <Container sx={{ display: "flex", justifyContent: "left" }}>
            <Typography variant="h5" component="h2">
              No events found
            </Typography>
          </Container>
        ) : null}
      </Box>
      <Grid container spacing={6}>
        {state.events.map((eventItem: EventDetails) => (
          <EventCard
            key={`${eventItem.id}${eventItem.name}`}
            imageUrl={eventItem.images[0].url}
            eventName={eventItem.name}
            eventDate={new Date(
              eventItem.dates.start.dateTime
            ).toLocaleDateString()}
            eventUrl={eventItem.url}
          />
        ))}
      </Grid>
      {state.currentPage < state.totalPages && (
        <Container
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        >
          <Button onClick={handleLoadMore} disabled={state.loading}>
            {state.loading ? <CircularProgress /> : "Load More"}
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Home;
