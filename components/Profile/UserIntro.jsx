import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from '../../constants/Colors';

export default function UserIntro() {

    const {user} = useUser();

  return (
    <View style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    }}>
        <Image source={{uri:user?.imageUrl}}
        style={{
            width: 110,
            height: 110,
            borderRadius: 99,
        }}/>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginTop: 10,
        }}>{user?.fullName}</Text>
        <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 15,
            marginTop: 0,
            color: Colors.GRAY,
        }}>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}