import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function About({business}) {
  return (
    <View style={{
        padding: 20,
        backgroundColor: '#fff',
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
      }}>Hakkında</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 14,
        lineHeight: 20,
        color: Colors.GRAY,
      }}> 
        {business?.about}
      </Text>
    </View>
  )
}