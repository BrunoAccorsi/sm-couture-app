# SM Couture App 👗

A React Native mobile application built with Expo for SM Couture, featuring appointment scheduling, user profiles, and a digital showcase of fashion services.

## Features

- **Authentication** - Secure sign-in with Google and Apple through Clerk
- **Appointment Scheduling** - Integrated Calendly booking system
- **Profile Management** - Personal profile with appointment history
- **Fashion Services** - Showcase of available services and pricing
- **About Section** - Company information and fashion gallery
- **Dark Mode** - Customizable theme preferences

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation (Expo Router)
- React Native Paper (UI Components)
- Clerk (Authentication)
- Calendly API (Appointment Scheduling)
- React Query (Data Fetching)
- Zustand (State Management)

## Environment Setup

The app requires several environment variables to function. Create a `.env` file in the root directory with the following variables:

```env
EXPO_PUBLIC_CALENDLY_API_USER=your_calendly_user_id
EXPO_PUBLIC_CALENDLY_API_URL=https://api.calendly.com
EXPO_PUBLIC_CALENDLY_API_KEY=your_calendly_api_key
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
EXPO_PUBLIC_API_URL=your_api_url
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd sm-couture-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## Project Structure

```
sm-couture-app/
├── app/                    # Main application code
│   ├── (auth)             # Authentication routes
│   ├── (tabs)             # Main app tabs
│   ├── components         # Reusable components
│   ├── context           # React context providers
│   ├── features          # Feature-specific code
│   ├── hooks             # Custom React hooks
│   └── theme             # Theme configuration
├── assets/                # Images and fonts
├── components/            # Global components
└── storage/              # Local storage utilities
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests

## Development

### File-based Routing

The app uses Expo Router for file-based routing. Routes are defined by the file structure in the `app` directory:

- `app/(auth)/*` - Authentication screens
- `app/(tabs)/*` - Main app tabs (Home, About, Profile)
- `app/(public)/*` - Public routes

### Styling

The app uses React Native Paper for UI components and follows Material Design 3 guidelines. Theme customization is available in:

- `app/theme/lightColors.json`
- `app/theme/darkColors.json`

### Data Fetching

Data fetching is handled through custom hooks using React Query:

- `useCalendlyQuery` - Calendly API integration
- `useClerkQuery` - Backend API calls with authentication
