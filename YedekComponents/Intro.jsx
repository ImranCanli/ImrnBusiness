import { View, Text, Image, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import MarkFav from '../components/MarkFav';

export default function Intro({business}) {

    const router = useRouter();
    const {user} = useUser();

    const onDeletePress = () => {
        Alert.alert('İşi sil ?', 'İşi silmek istediğinizden emin misiniz ?', [
            {
                text: 'İptal',
                style: 'cancel',
            },
            {
                text: 'Sil',
                style: 'destructive',
                onPress: () => deleteBusiness(),
            }
        ])
    }

    const deleteBusiness = async () => {
        // console.log('isi sil');
        await deleteDoc(doc(db, 'businessList', business?.id));
        router.back();
        ToastAndroid.show('İş silindi', ToastAndroid.BOTTOM);
    }

  return (
    <View>
        <View style={{
            position: 'absolute',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            paddingTop: 30,
            top: 20,
            width: '100%',
        }}>
        <TouchableOpacity 
            onPress={() => router.back()}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: 99,
                padding: 10,
                minWidth: 50,
            }}              
        >
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 99,
            padding: 10,
        }}>
            BURASI
        </TouchableOpacity> */}
        <MarkFav business={business}/>
        </View>
        <Image 
        source={{uri: business?.imageUrl}}
        style={{
            width: '100%',
            height: 340,
        }}/>
        <View style={{
            padding: 20,
            marginTop: -20,
            backgroundColor: '#fff',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}>
            <View>
            <Text style={{
                fontSize: 26,
                fontFamily: 'outfit-bold',
                marginBottom: 15,
            }}>{business?.name}
            </Text>
            <Text style={{
                fontSize: 15,
                fontFamily: 'outfit',
                color: Colors.GRAY,
            }}>{business?.ardess}</Text>
            </View>
            {user?.primaryEmailAddress?.emailAddress == business?.userEmail &&            
                <TouchableOpacity onPress={()=> onDeletePress()}>
                    <Ionicons name="trash" size={25} color="red" style={{marginTop: 10}}/>
                </TouchableOpacity> 
            }
        </View>
    </View>
  )
}