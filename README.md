# DataPulse — Real-Time API Integration Dashboard

DataPulse is a premium real-time dashboard that integrates multiple external APIs into one modern analytics interface. It combines live weather data, country intelligence, market insights, favorites, and dashboard-level summaries in a polished SaaS-style experience.

## Overview

This project was built to demonstrate production-style frontend architecture and strong API integration skills. It showcases how to fetch, normalize, display, and organize data from different public APIs while maintaining a clean user experience and scalable codebase.

## Features

- Real-time weather search with current conditions and forecast
- Countries explorer with search, region filters, and rich detail modal
- Markets explorer with live market data, search, sorting, and charts
- Favorites system with localStorage persistence
- Unified dashboard overview combining insights from all modules
- Premium dark SaaS-style responsive UI
- Loading, error, and empty states across features
- Modular frontend architecture with mapper-based data normalization

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui style components
- React Router
- TanStack Query
- Recharts
- localStorage persistence

## APIs Used

- OpenWeather
- REST Countries
- CoinGecko

## Architecture Highlights

DataPulse follows a feature-based frontend architecture:

- API logic is isolated per feature
- raw external responses are transformed through mapper functions
- UI components consume internal typed models only
- TanStack Query handles caching, async state, and refetching
- localStorage powers favorites and recent interactions

### Project structure

```txt
src/
  app/
    providers/
    router/
  components/
    ui/
    layout/
    shared/
    charts/
    cards/
    filters/
  features/
    dashboard/
    weather/
    countries/
    markets/
    favorites/
  lib/
  services/
  store/
  styles/
  types/