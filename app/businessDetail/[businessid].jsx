import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import Intro from '../../YedekComponents/Intro';
import ActionButton from '../../YedekComponents/ActionButton';
import About from '../../YedekComponents/About';
import { ScrollView } from 'react-native';
import Reviews from '../../YedekComponents/Reviews';

export default function businessid() {

    useEffect(() => {
        getBusinessDetailById();
    }, []);

    const {businessid} = useLocalSearchParams();
    const [business, setBusiness] = useState();
    const [loading, setLoading] = useState(false);

    const getBusinessDetailById = async () => {

        setLoading(true);
        const docRef = doc(db, 'businessList', businessid);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            setBusiness({id: docSnap.id, ...docSnap.data()});
            setLoading(false);
        }else{
            setLoading(false);
        }
    }

  return (
    <ScrollView>
        {loading ? 
        <ActivityIndicator
        size={'large'}
        style={{marginTop: '70%'}}
        color={Colors.PRIMARY} 
        /> : 
        <View>
            <Intro business={business}/>
            <ActionButton business={business}/>
            <About business={business}/>
            <Reviews business={business} />
        </View>}
    </ScrollView>
  )
}