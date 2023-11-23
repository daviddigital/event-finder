## Overview

A simple demo react app for querying an events API and displaying some events.

## Features

1. Find events with start date, end date and country. Display in a mobile friendly Material UI grid
2. Use the context hook to store events in state for the current paginated data
3. Allow a "load more" button that increments the pagenumber and updates the context

Technologies used include typescript, react, vite, vitest & material ui.

## Demo

## Installation

1. Clone the repo
2. Change into the directory `cd event-finder`
3. Create an .env file with an API key from https://developer-acct.ticketmaster.com/, replace 123XYZ with your key `echo "VITE_API_KEY='123XYZ'" > .env`
4. Install the dependencies `npm install`
5. Run the development server `npm run dev`
6. Open the browser to the displayed address & port, e.g. http://127.0.0.1:5173/

## Further improvements

### Implement a backend

Rather than quering the third party API directly, at a minimum set up a backend as a proxy so as to not expose API keys.

As this is a quick demo project with free API keys this was not implemented.

### Implement in memory cache

Rather than fetching events every time from the external API, implement caching of event data at a location and date with a 15 minute expiry. e.g. using redis

Events don't change much, and this will allow a faster experience and also help with sticking to API usage limits on basic tiers.

### Implement datetime not just date

The default datetime-local option for MUI date pickers were finnicky so I just went with startdate and enddate, this won't be accurate as haven't accounted for user's locale and its setting to midnight UTC.

### Error messaging and handling

e.g. if there are no events for a date and location, this is just being sent to console

### Set up complete typing on the event details

As the event object is very large, a full type safety on event details has not been implemented

## Implement more testing

Mock API responses
