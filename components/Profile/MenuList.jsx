import { View, Text, FlatList, Image, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo';


export default function MenuList() {

    const router = useRouter();
    const {signOut} = useAuth();

    const menuList = [
        {
            id: 1,
            name: 'Yeni iş ekle',
            icon: require('./../../assets/images/add.png'),
            path: '/business/AddBusiness',
        },
        {
            id: 2,
            name: 'Benim işlerim',
            icon: require('./../../assets/images/business-and-trade.png'),
            path: '/business/MyBusiness',
        },
        // {
        //     id: 3,
        //     name: 'Uygulamayı Paylaş',
        //     icon: require('./../../assets/images/share_1.png'),
        //     path: 'share',
        // },
        {
            id: 4,
            name: 'Çıkış yap',
            icon: require('./../../assets/images/logout.png'),
            path: 'logout',
        },
        {
            id: 3,
            name: 'Favorilerim',
            icon: require('./../../assets/images/favourites_icon.png'),
            path: '/favourites/FavouritesList',
        },
    ]

    const onMenuClick = (item) => {
      if(item.path == 'logout'){
        signOut();
        return;
      }
      if(item.path == 'share'){
        Share.share({message: 'Imran Canlı mobil iş merkezi uygulamaısnı edinin.',});
        return;
      }
      router.push(item.path);
    }

  return (
    <View style={{ marginTop: 50}}>
      <FlatList
      data={menuList}
      numColumns={2}
      renderItem={({item, index}) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => onMenuClick(item)}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 15,
            flex: 1,
            borderRadius: 15,
            backgroundColor: '#fff',
            padding: 10,
            margin: 10,
          }}
        >
            <Image source={item.icon} style={{ width: 70, height: 70}}/>
            <Text style={{fontFamily: 'outfit-medium', fontSize: 15, flex: 1}}>{item.name}</Text>
        </TouchableOpacity>
      )}/>
      <Text style={{width: '100%', textAlign: 'center', fontFamily: 'outfit', color: Colors.GRAY, marginTop: 20}}>Imran Canli @ 2024</Text>
    </View>
  )
}