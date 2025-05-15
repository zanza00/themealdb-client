# TheMealDB Client

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
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

- React
- TypeScript
- Chakra UI
- Zustand
- Vite
- Vitest (for unit/integration testing)
- Playwright (for end-to-end testing)

## Getting Started

### Prerequisites

- Node.js (version 22)
- npm

### Installation

1. Install dependencies:
```bash
npm install
````

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
