import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsContext from "./context/EventsContext";
import stateReducer from "./context/stateReducer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import type { State } from "./types";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const initialState: State = {
  events: [],
  currentPage: 0,
  totalPages: 0,
  loading: false,
};

function App() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EventsContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </EventsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
