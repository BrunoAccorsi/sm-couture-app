import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"
import { SButton } from '../components/Button'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from "react"
import { useSSO } from "@clerk/clerk-expo"

WebBrowser.maybeCompleteAuthSession()

export default function SignIn(){

  const [isLoading, setIsLoading] = useState(false)

  const googleOAuth = useSSO()

  async function onGoogleSignIn(){
    try {
      setIsLoading(true)

      const oAuthFlow = await googleOAuth.startSSOFlow({
        strategy: 'oauth_google'
      })

      if(oAuthFlow.authSessionResult?.type === 'success'){
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


// import { useSignIn } from '@clerk/clerk-expo'
// import { Link, useRouter, router } from 'expo-router'
// import { Text, TextInput, Button, View, StyleSheet } from 'react-native'
// import React from 'react'
// import { SButton } from './components/Button'

// export default function Page() {
//   const { signIn, setActive, isLoaded } = useSignIn()
//   const router = useRouter()

//   const [emailAddress, setEmailAddress] = React.useState('')
//   const [password, setPassword] = React.useState('')

//   // Handle the submission of the sign-in form
//   const onSignInPress = React.useCallback(async () => {
//     if (!isLoaded) return

//     // Start the sign-in process using the email and password provided
//     try {
//       const signInAttempt = await signIn.create({
//         identifier: emailAddress,
//         password,
//       })

//       // If sign-in process is complete, set the created session as active
//       // and redirect the user
//       if (signInAttempt.status === 'complete') {
//         await setActive({ session: signInAttempt.createdSessionId })
//         router.replace('/')
//       } else {
//         // If the status isn't complete, check why. User might need to
//         // complete further steps.
//         console.error(JSON.stringify(signInAttempt, null, 2))
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }, [isLoaded, emailAddress, password])