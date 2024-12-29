import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'

export default function ActionButton({business}) {

    const actionButtonMenu = [
        {
            id: 1,
            name: 'Arama',
            icon: require('./../assets/images/call.png'),
            url: 'tel:'+business?.contact,
        },
        {
            id: 2,
            name: 'Konum',
            icon: require('./../assets/images/pin.png'),
            url: 'https://www.google.com/maps/search/?api=1&query='+business?.ardess,
        },
        {
            id: 3,
            name: 'Web',
            icon: require('./../assets/images/web.png'),
            url: business?.website,
        },
        {
            id: 4,
            name: 'Paylaş',
            icon: require('./../assets/images/share.png'),
            url: business?.website,
        },
    ]

    const onPressHandle = (item) => {

        if(item.name == 'Paylaş'){

            Share.share({
                message: business?.name+"\n Adres: "+business?.ardess+"\nimrn-business hakkında detaylı bilgi için;"+business?.website,
            })

            return;
        }
        Linking.openURL(item.url);
    }

  return (
    <View style={{
        backgroundColor: '#fff',
        padding: 20,
    }}>
      <FlatList
        style={{
            width: '100%',
            display: 'flex',
        }}
        columnWrapperStyle= {{
            justifyContent: 'space-around',
        }}
        data={actionButtonMenu}
        numColumns={4}
        renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => onPressHandle(item)}>
                <Image source={item?.icon} style={{
                    width: 50,
                    height: 50,
                }}/>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    textAlign: 'center',
                    marginTop: 4,
                }}>
                    {item?.name}
                </Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}