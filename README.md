# TheMealDB Client

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Assumptions and Design Decisions](#assumptions-and-design-decisions)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Testing](#testing)
  - [Running Vitest Tests](#running-vitest-tests)
  - [Running Playwright Tests](#running-playwright-tests)

## Overview

This project is a client application for [TheMealDB.com](https://www.themealdb.com/), an open, crowd-sourced database of recipes from around the world. It allows users to browse, search, and manage their favorite meals.

You can see a live version of the client at: [https://zanzapla.net/themealdb-client/](https://zanzapla.net/themealdb-client/)

## Features

- **Search Meals**:
  - By name
  - By category, culinary area (cusine) or main ingredient
- **Favorite Meals**:
  - Save your favorite meals.
  - View your list of saved favorite meals.

## Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev/)
- [Vite](https://vitejs.dev/) (by using `npm create vite@latest`)
- [Vitest](https://vitest.dev/) (for unit testing)
- [Playwright](https://playwright.dev/) (for E2E testing)
- [Github Actions](https://docs.github.com/en/actions) (for CI/CD)

## Assumptions and Design Decisions

- The application is designed primarily for desktop browsers, though some responsive design is present.
- State management is handled by Zustand due to its simplicity.
  - Also for the persist middleware that simplyfy a lot the saving and restoring of the favourites (with versioning of the storage shape/schema).
- Chakra UI was chosen becouse I did previously analyzed for a previous project but never used it, but i liked its approach to component and style.
  - I used it in a very vanilla way, without any customisation.
  - The dark/light mode and toaster came from initializing the chakraui package.
- Zod is used for "frontier" validation. (API and localstorage).
- Meal data is fetched directly from TheMealDB API, the pages are divided by API endpoints (homepage for /search.php, advanced search for /filter.php).

### Homepage

- In the homepage the user can search only by name.
- It is basically a frontend for /search.php endpoint.
- The search is done as soon as the first letter, a debounce is not used due to time constraints. It's an area of future improvement.
- React query handles the caching of the data. It's for one hour to avoid hammering the API.
- There is a skeleton for loading state.
- The user can save a meal as favorite.

### Advanced Search

- The user can search by category, culinary area (cusine) or main ingredient in a dedicated page.
- In my experience /filter.php is an OR filter, the UX of this page is basic at best.
- The loading of the data is done by React query inside React Router data loading for the routes. [See example here](https://tanstack.com/router/latest/docs/framework/react/examples/basic-react-query-file-based)
- The user can save a meal as favorite.

### Meal Details

- This is a simple frontend for /lookup.php endpoint.
- The ingredients are extracted with a function to change the API response to a more usable format.
- The user can save a meal as favorite.

### Favorites

- The user can view the list of favorite meals.
- The user can remove a meal from the list of favorite meals. Since it's a destructive action, the user will be asked to confirm the action.
- Since the localstorage can be changed by the user Zod is used to validate the data. If the data it's not valid the code disregard the storage in it's enterity and use an empty list.
- This is not ideal, in a proper application (without a server to store the favourites) the code should try to discard only the invalid items.

### Unit testing

- What is covered is not 100%, I tried to cover what I considered the application code and not the library code. I trust that react query, router, chakra ui and zod are well tested.
- I tried to test edge cases regarding what happens when something fails in loading the data from the API or localstorage.
- Some functions are exported only for testing purposes (inside a `exportedForTest` object), this is for easier and faster testing. I did not find a simpler way to do it.

### E2E testing

- I've used Playwright for the E2E testing, it's my first time using it for testing purposes.
- I tried to test for common flows with some error handling coverage.

### Github Actions

- First time I've used Github Actions.
- it autodeploys to zanzapla.net/themealdb-client/ 
- I've not tryied to setup tests before running the build, it's a good idea for the future.


## Getting Started

### Prerequisites

- Node.js (tested with version 22, it might work with other versions)
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers (for end-to-end tests)

```bash
npx playwright install
```

### Running the Project

To start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

## Testing

This project uses Vitest for unit tests, and Playwright for end-to-end tests.

### Running Vitest Tests

To run the Vitest tests:

```bash
npm run test
```

### Running Playwright Tests

To run the Playwright E2E tests:

```bash
test:e2e
```

To run a single test in UI mode

```bash
npx playwright test tests/<test-file-name>.spec.ts --ui
```
