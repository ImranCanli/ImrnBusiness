import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {

  const [businessList, setBusinessList] = useState([]);

  // useEffect(() => {
  //   getBusinessByCategory();
  // }, [])

  const getBusinessByCategory = async (category) => {

    setBusinessList([]);

    const q = query(collection(db, 'businessList'), where('category', '==', category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setBusinessList( prev => [...prev, {id: doc.id, ...doc.data()}])
      console.log(doc.data());
    })
  }

  return (
    <View style={{
      padding: 20,
      paddingTop: 40,

    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25,
      }}>
        Daha fazlasını keşfedin
      </Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        marginTop: 25,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput placeholder='Arama yapın...' style={{
            fontFamily: 'outfit',
            fontSize: 16,
        }}/>
      </View>
      <Category style={{
        marginLeft: -30,
      }} explore={true}
      onCategorySelect={(category) => getBusinessByCategory(category)}
      />
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}