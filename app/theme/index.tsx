import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import lightColors from './lightColors.json';
import darkColors from './darkColors.json';

export const lightTheme = {
  ...DefaultTheme,
  colors: lightColors.colors,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: darkColors.colors,
};
