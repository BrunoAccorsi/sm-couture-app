import React from 'react';
import { darkTheme, lightTheme } from '../theme';
import { Provider } from 'react-native-paper';

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});

type Props = {
  children: React.ReactNode;
};

export const PreferencesProvider = ({ children }: Props) => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? darkTheme : lightTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <Provider theme={theme}>{children}</Provider>
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => React.useContext(PreferencesContext);
