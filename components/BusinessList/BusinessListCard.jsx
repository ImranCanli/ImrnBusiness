import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CategoryBadge from '../../YedekComponents/CategoryBadge'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'

export default function BusinessListCard({business}) {

    const router = useRouter()

  return (
    <TouchableOpacity
    onPress={() => router.push('/businessDetail/' + business.id)} 
    style={{
        padding: 10,
        margin: 14,
        borderRadius: 15,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }}>
      <Image source={{uri: business?.imageUrl}} style={{
        width: 200,
        height: 120,
        borderRadius: 15,
        marginRight: 10,
      }}/>

       <View style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        width: 160,
        gap: 10,
       }}>
            <Text style={{
                color: Colors.PRIMARY,
                fontFamily: 'outfit-bold',
                fontSize: 19,
            }}>{business.name}</Text>

            <Text style={{
                color: Colors.GRAY,
                width: 160,
                fontSize: 12,
            }}>{business.ardess}</Text>

            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 150,
                    flexWrap: 'wrap'
                }}>
                    <CategoryBadge ctgry={business.category}/>
                    <View style={{
                        paddingTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Image source={require('./../../assets/images/star.png')} style={{
                            width: 15,
                            height: 15,
                            marginRight: 7,
                        }}/>
                        <Text style={{
                            fontFamily: 'outfit',
                            color: Colors.GRAY,
                        }}>
                            4.5
                        </Text>
                    </View>
                    {/* <Text>{business.category}</Text> */}
                </View>
       </View>
    </TouchableOpacity>
  )
}