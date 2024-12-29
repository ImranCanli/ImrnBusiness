import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {

    const router = useRouter();

  return (
    <TouchableOpacity style={{
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 16,
        marginVertical: 10,
    }}
    onPress={() => router.push('/businessDetail/'+business?.id)}>
        <Image source={{uri:business.imageUrl}} style={{
            width: '100%',
            height: 150,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        }}/>
      <View style={{
        padding: 10,
      }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,  
        }}>
            {business?.name}
        </Text>
        <Text style={{
            fontFamily: 'outfit',
            color: Colors.GRAY,
        }}>
            {business?.ardess}
        </Text>
      </View>
    </TouchableOpacity>
  )
}