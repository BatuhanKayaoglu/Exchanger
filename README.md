# Exchange Rate App

Welcome to the **Exchange Rate App**, a React Native application built with Expo. This app allows users to convert currencies, view historical exchange rates, and manage their accounts with authentication features.

## Features

- 🌎 **Currency Conversion:** Convert between different currencies in real-time.
- 📈 **Historical Data:** View past exchange rates using interactive charts.
- 🔐 **Authentication:** Register and log in securely.
- 🎨 **Smooth UI:** Modern and user-friendly interface with animations.
- 🔔 **Notifications:** Get notified about significant exchange rate changes.

## Tech Stack

This project is built with the following technologies:

- **React Native & Expo** - For mobile development
- **Redux Toolkit** - For state management
- **React Navigation** - For seamless app navigation
- **React Native Chart Kit** - For displaying exchange rate history
- **Async Storage** - For local data storage
- **Expo Notifications** - For push notifications


## Project Structure

```
exchange-rate-app/
│── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Application screens (Login, Register, Converter, History)
│   ├── redux/         # Redux store and slices
│   ├── utils/         # Utility functions
│   ├── assets/        # Static assets (icons, images)
│── App.js            # Main app entry point
│── package.json      # Dependencies and scripts
│── README.md         # Project documentation
```

## Environment Variables
Create a `.env` file in the root directory and configure your API keys:

```
EXCHANGE_API_KEY=your_api_key_here
```  



