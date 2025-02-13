import React from "react"
import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { styles } from "./styles"

interface ButtonProps extends TouchableOpacityProps {
    title: string
    isLoading?: boolean
    icon: keyof typeof Ionicons.glyphMap
}

export function SButton({ title, isLoading = false, icon, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity 
        style={styles.container} 
        disabled={isLoading} 
        activeOpacity={0.8} 
        {...rest}
    >
        {isLoading ? (
            <ActivityIndicator color="white" />
        ) : (
        <>
            <Ionicons name={icon} style={styles.icon}/>
            <Text style={styles.text}>{title}</Text>
        </>
        )}
    </TouchableOpacity>
  )
}