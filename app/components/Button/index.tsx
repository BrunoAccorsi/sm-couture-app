import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { createStyles } from './styles';

interface SButtonProps {
  title: string;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  variant?: 'default' | 'google' | 'apple';
}

export function SButton({
  title,
  onPress,
  icon,
  variant = 'default',
}: SButtonProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const containerStyle = [
    styles.container,
    variant === 'google' && styles.googleContainer,
    variant === 'apple' && styles.appleContainer,
  ];

  const iconStyle = [
    styles.icon,
    variant === 'google' && styles.googleIcon,
    variant === 'apple' && styles.appleIcon,
  ];

  const textStyle = [
    styles.text,
    variant === 'google' && styles.googleText,
    variant === 'apple' && styles.appleText,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Ionicons name={icon} style={iconStyle} />
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}
