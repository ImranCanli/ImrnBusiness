import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import CategoryBadge from './../YedekComponents/CategoryBadge'
import { useRouter } from 'expo-router'

export default function PopularBusinessCard({business, mgLeftValue = 20}) {

    const router = useRouter();

    const onPressHandle = () => {
        router.push("/businessDetail/"+business?.id);
    }

  return (
    <TouchableOpacity
    onPress={()=> onPressHandle()} 
    style={{
        marginBottom: 20,
        marginLeft: mgLeftValue,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 15, 
        height: 280,
        display: 'flex',
    }}>
        <Image source={{uri: business?.imageUrl}}
        style={{
            width: '100%',
            height: 150,
            borderRadius: 15,
        }}/>
        <View style={{
            marginTop: 10,
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 17,
            }}>{business.name}</Text>
            <Text style={{
                width: 250,
                textAlign: 'left',
                fontFamily: 'outfit',
                fontSize: 11,
                marginTop: 5,
                color: Colors.GRAY,
            }}>{business.ardess}</Text>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: mgLeftValue == 0 ? '100%' : 250,
                }}>
                    <View style={{
                        paddingTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <Image source={require('./../assets/images/star.png')} style={{
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
                    <CategoryBadge ctgry={business.category}/>
                </View>
            </View>        
        </View>
    </TouchableOpacity>
  )
}