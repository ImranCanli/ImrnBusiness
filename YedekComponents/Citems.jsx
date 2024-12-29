import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'


export default function Citems({icon, name, id, onCategoryPress}) {
  return (
    // <View>
    // <Text>{icon}</Text>
    // <Text>{name}</Text>
    // <Text>{id}</Text>
    // </View>
    <TouchableOpacity onPress={()=>onCategoryPress({icon, name, id})}>
        <View style={{padding:15,
        backgroundColor:Colors.ICON_BG,
        borderRadius:20,
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        
        }}>
            <Image source={{uri:icon}}
            style={{
            width:35,
            height:35,
            opacity: 0.7,
        }}
            />
        </View>
        <Text style={{
            fontSize:12,
            fontFamily:'outfit-bold',
            textAlign:'center',
            marginTop:5,
            color: Colors.PRIMARY
        }}>{name}</Text>
    </TouchableOpacity>
  )
}