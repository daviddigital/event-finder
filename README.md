## Overview

A simple demo react app for querying and displaying events from the ticketmaster API.

## Features

1. Find events with start date, end date and country location using a lookup on country code.
2. Display events in a mobile friendly Material UI grid.
3. A "load more" button that gets the next "page" of data from the API.

Technologies used include typescript, react, material ui, vite, vitest & material ui.

## Demo

https://shiny-sawine-26419f.netlify.app/

## Installation

1. Clone the github repo `git clone https://github.com/daviddigital/event-finder.git`
2. Change into the directory `cd event-finder`
3. Create an .env file with an API key from https://developer-acct.ticketmaster.com/ `echo "VITE_API_KEY='YOUR_API_KEY'" > .env`
4. Install the dependencies `npm install`
5. Run the development server `npm run dev`
6. Open the browser to the displayed address & port, e.g. http://127.0.0.1:5173/
7. Run the tests `npm run test`

## Further improvements

### Implement a backend

Rather than querying the third party API directly, at a minimum set up a backend as a proxy so as to not expose API keys.

As this is a quick demo project with free API keys this was not implemented.

#### Implement in memory cache

Rather than fetching events every time from the external API, implement caching of event data at a location and date with a 15 minute expiry. e.g. using redis

Events don't change much, and this will allow a faster experience and also help with sticking to API usage limits on basic tiers.

### Implement datetime not just date

The application only uses start and end dates, defaulting to midnight UTC. A better implementation would be to include times and correctly set datetimes based on the user's locale.

### Implement more testing

e.g. Mock API responses, date picker, empty states, etc.
