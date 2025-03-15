import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkTheme, lightTheme } from '../theme';
import { Provider } from 'react-native-paper';

// Theme preference key for storage
const THEME_PREFERENCE_KEY = 'sm-couture-theme-preference';

type PreferencesContextType = {
  isThemeDark: boolean;
  toggleTheme: () => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  // Load saved theme preference on component mount
  useEffect(() => {
    const loadSavedThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme !== null) {
          setIsThemeDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      }
    };

    loadSavedThemePreference();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isThemeDark;
    setIsThemeDark(newTheme);

    // Save theme preference to AsyncStorage
    try {
      await AsyncStorage.setItem(
        THEME_PREFERENCE_KEY,
        newTheme ? 'dark' : 'light'
      );
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  let theme = isThemeDark ? darkTheme : lightTheme;

  return (
    <PreferencesContext.Provider value={{ isThemeDark, toggleTheme }}>
      <Provider theme={theme}>{children}</Provider>
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
