import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import EventCard from "../src/components/EventCard";
import EventsContext from "../src/context/EventsContext";
import React from "react";
import { BrowserRouter } from "react-router-dom";

const testState = {
  events: [],
  currentPage: 0,
  totalPages: 0,
  loading: false,
};

const props = {
  imageUrl: "test_image.jpg",
  eventName: "Test Event",
  eventDate: "2022-01-01",
  eventUrl: "/test-event",
};

const testDispatch = () => {};

describe("Renders EventCard component correctly", () => {
  it("Should render the component correctly", async () => {
    // Setup
    render(
      <EventsContext.Provider
        value={{ state: testState, dispatch: testDispatch }}
      >
        <BrowserRouter>
          <EventCard {...props} />
        </BrowserRouter>
      </EventsContext.Provider>
    );
    // Assertions
    const eventNameElement = screen.getByText("Test Event");
    const eventDateElement = screen.getByText("2022-01-01");

    expect(eventNameElement).not.toBeNull();
    expect(eventDateElement).not.toBeNull();
  });
});
