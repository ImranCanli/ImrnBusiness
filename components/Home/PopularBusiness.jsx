import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from './../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PopularBusinessCard from '../../YedekComponents/PopularBusinessCard'

export default function PopularBusiness() {

    const [businessList, setBusinessList] = useState();
     
    useEffect(() => {
        getBusienssList();
    }, []);

    const getBusienssList = async () => {
        
        setBusinessList([]);
        const q = query(collection(db, 'businessList'), limit(10));
        const querySnapShot= await getDocs(q); 

        querySnapShot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList( prev => [...prev, {id: doc.id, ...doc.data()}]);
        })
    }

  return (
    <View>
        <View style={{
            padding: 20,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
        }}>
            <Text style={{
            paddingLeft:10,
            marginTop: 10,
            fontSize: 20,
            fontFamily: 'outfit-bold',
            }}>Popüler
            </Text>
            <Text style={{
                color: '#7F57F1',
                fontFamily: 'outfit-medium',
            }}>Tümünü Gör</Text>
        </View>
        <FlatList data={businessList}
        horizontal={true}
        renderItem={({item, index}) => (
           <PopularBusinessCard key={index} business={item}/>
        )}/>
    </View>
  )
}