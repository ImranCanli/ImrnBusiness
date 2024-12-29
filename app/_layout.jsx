import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store'
import LoginScreen from './../components/LoginScreen'

// const tokenCache = {
//   async getToken(key) {
//     try {
//       const item = await SecureStore.getItemAsync(key)
//       if(item){
//         console.log(`${key} kullanildi \n`)
//       }else{
//         console.log('key degiskeninde tutulan bir deger bulunmuyor' + key)
//       }
//       return item
//     } catch (error) {
//       console.error('SecureStore get item hatasi: ', error)
//       await SecureStore.deleteItemAsync(key)
//       return null
//     }
//   },
//   async saveToken(key, value){
//     try {
//       return SecureStore.setItemAsync(key, value)
//     } catch (error) {
//       return
//     }
//   },
// }

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if(!publishableKey){
  throw new Error(
    '.env dosyasinda EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY degiskeni yok ve ya yanlıs'
  )
}

export default function RootLayout() {

  useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  return (
    // <ClerkProvider publishableKey={publishableKey}>
    //     <SignedIn>
    //       <Stack screenOptions={{
    //         headerShown: false,
    //       }}>
    //         <Stack.Screen name="(tabs)" />
    //       </Stack>
    //     </SignedIn>
    //     <SignedOut>
    //       <LoginScreen/>
    //     </SignedOut>
    // </ClerkProvider>
    <ClerkProvider  tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{
          headerShown:false,
         
        }}>
          <Stack.Screen name="(tabs)"
       
          />
        </Stack>
      </SignedIn>
      <SignedOut>
       <LoginScreen/>
      </SignedOut>
    
    </ClerkProvider>

  );
}
