import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Home from "../src/pages/Home";
import EventsContext from "../src/context/EventsContext";
import React from "react";

const testState = {
  events: [],
  currentPage: 0,
  totalPages: 0,
  loading: false,
};

const testDispatch = () => {};

describe("Renders main page correctly", () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(
      <EventsContext.Provider
        value={{ state: testState, dispatch: testDispatch }}
      >
        <Home />
      </EventsContext.Provider>
    );

    // Assertions
    const h1 = await screen.findByText("Find Events");
    expect(h1).not.toBeNull();
  });
});
