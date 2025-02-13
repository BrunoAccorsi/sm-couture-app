import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"
import { SButton } from './components/Button'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from "react"
import { useSSO } from "@clerk/clerk-expo"

WebBrowser.maybeCompleteAuthSession()

export default function SignIn(){
    console.log("signin function")

  const [isLoading, setIsLoading] = useState(false)

  const googleOAuth = useSSO()

  async function onGoogleSignIn(){
    try {
      setIsLoading(true)
      console.log("setisloading")

      const oAuthFlow = await googleOAuth.startSSOFlow({
        strategy: 'oauth_google'
      })

      if(oAuthFlow.authSessionResult?.type === 'success'){
        console.log("success condition")
        if(oAuthFlow.setActive){
          await oAuthFlow.setActive({
            session: oAuthFlow.createdSessionId,
          })
        } else {
          setIsLoading(false)
        }
        router.replace('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    WebBrowser.warmUpAsync()

    return () => {
      WebBrowser.coolDownAsync()

    }
  },[])
  
  return (
  <View style={styles.container}>
    <Text style={styles.title}>Sign in</Text>
    <SButton 
      icon="logo-google" 
      title='Sign in with Google'
      onPress={onGoogleSignIn}
      isLoading={isLoading}
    />
  </View>
)
}


const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 32,
  justifyContent: 'center',
  gap: 12,
},
title: {
  fontSize: 22,
  fontWeight: 'bold',
}
})