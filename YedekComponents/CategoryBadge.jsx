import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function CategoryBadge({ctgry}) {
  return (
    <View style={{
        backgroundColor: Colors.LIGHTBG,
        display: 'flex',
        padding: 3,
        borderRadius: 5,
        marginLeft: 5,
        marginTop: 10,
    }}>
        <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'outfit-bold',
            fontSize: 11,
        }}>{ctgry}</Text>
    </View>
  )
}