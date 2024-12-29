import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import BusinessListCard from './../../components/Explore/BusinessListCard'
import { Colors } from '../../constants/Colors';
import { useNavigation } from 'expo-router';

export default function MyBusiness() {

    const {user} = useUser();
    const [userBusinessList, setUserBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Benim İşlerim',
            headerShown: true,

            headerStyle: {
                backgroundColor: Colors.PRIMARY,
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 21,
                fontFamily: 'outfit-bold',
            },
            headerTintColor: '#fff',
        })
        user&&getUserBusiness();
    }, [user])

    const getUserBusiness = async () => {
        setLoading(true);
        setUserBusinessList([]);
        const q = query(collection(db,'businessList'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            console.log('Burasi onemli' + doc.data());
            setUserBusinessList(prev => [...prev,{id: doc.id, ...doc.data()}])
        })
        setLoading(false);
    }

  return (
    <View style={{
        padding: 20,
        paddingTop: 40,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
        color: Colors.PRIMARY,
        marginBottom: 10,
      }}>Benim İşlerim</Text>

      <FlatList data={userBusinessList}
      onRefresh={() => getUserBusiness()}
      refreshing={loading} 
      renderItem={({item, index}) => (
        <BusinessListCard business={item} key={index}/>
      )}/>
      <Text style={{
        fontFamily: 'outfit-medium',
        fontSize: 13,
        color: Colors.GRAY,
        marginTop: 10,
        textAlign: 'center',
      }}>Imran Canli @ 2024</Text>
    </View>
  )
}