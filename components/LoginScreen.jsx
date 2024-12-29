import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser'

import { Colors } from './../constants/Colors'
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
        <View style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 100
        }}>
            <Image source={require('./../assets/images/businessAppLogin.jpg')} style={{
                width: 220,
                height: 450,
                borderRadius: 20,
                borderWidth: 5,
                borderColor: '#000',
            }}/>
        </View>

        <View style={styles.subContaier}>
            <Text style={{fontSize:30, fontFamily: 'outfit-bold', textAlign: 'center'}}>Tüm Hizmet İhtiyacınız <Text style={{color: Colors.PRIMARY}}>Tek Bir Dokunuşta</Text>!</Text>
            <Text style={{fontSize: 15, fontFamily: 'outfit', textAlign: 'center', marginVertical: 15, color: Colors.GRAY}}>İhtiyacınıza göre hızlı ve güvenilir hizmet sağlayın.</Text>

            <TouchableOpacity style={styles.btn} onPress={onPress}>
                <Text style={{textAlign: 'center', color: '#fff', fontFamily: 'outfit-bold', fontSize: 16}}>Hadi Başlayalım!</Text>
            </TouchableOpacity>
        </View> 
    </View>
  )
}

const styles = StyleSheet.create({
  subContaier: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: 20,
  }
})
