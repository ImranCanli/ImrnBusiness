import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Shared from '../../Shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import { Colors } from '../../constants/Colors';
import { useNavigation } from 'expo-router';
import PopularBusinessCard from '../../YedekComponents/PopularBusinessCard';

export default function FavouritesList() {

    const {user} = useUser();
    const [favIds, setFavIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [businessesFinal, setBusinessesFinal] = useState([]);

    useEffect(() => {
          navigation.setOptions({
            headerTitle: 'Favorilerim',
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
        user&&GetFavBusiness();
    }, [user]);

    // const GetFavBusiness = async () => {
    //     setLoading(true);
    //     const result = await Shared.GetFavList(user);
    //     // console.log(result);
    //     const favuoriteBuss = result?.favourites;

    //     if(favourites && favourites.length > 0){
    //       setFavIds(favuoriteBuss);
    //       console.log('Buraya dikkat ! ' + favuoriteBuss);
    //       await GetFavBusinessList(favuoriteBuss);
    //     }else{
    //       console.log('favori listesi bos');
    //     }
    //     // setFavIds(result?.favourites);
    //     // console.log(result?.favourites);
    //     // GetFavBusinessList();
    // }

      const GetFavBusiness = async () => {
        setLoading(true);
        const result = await Shared.GetFavList(user);
        console.log(result);
        const favourites = result?.favourites;
    
        if (favourites && favourites.length > 0) {
            setFavIds(favourites);
            console.log('Buraya dikkat! ' + favourites);
            await GetFavBusinessList(favourites);
        } else {
            console.log('Favori listesi boş');
            setLoading(false);
        }
    };

    const GetFavBusinessList = async (favouriteBusinesses) => {
        setBusinessesFinal([]);
        //console.log(favouriteBusinesses);
        const q = query(collection(db, 'businessList'), where('__name__', 'in', favouriteBusinesses));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            console.log('Burada ihtiyacimiz olan obje var hhihihi :' + doc.data());
            setBusinessesFinal(prev => [...prev, {id: doc.id, ...doc.data()}]);
        })
        setLoading(false);
    }

  return (
    <View style={{
        padding: 20,
        marginTop: 20,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      }}>Favorilerim</Text>
      {loading?
        <ActivityIndicator 
          size={'large'}
          style={{
            marginTop: '70%',
          }}
          color={Colors.PRIMARY}
        /> 
      : <View style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        >
          {businessesFinal.length == 0 ? 
            <Text style={{
              color: Colors.GRAY,
              fontFamily: 'outfit-bold',
              textAlign: 'center',
              width: '100%',
              fontSize: 20,
              marginTop: '70%',
            }}>
              Favoriniz bulunmuyor.
            </Text> 
          : 
            <FlatList 
              data={businessesFinal}
              style={{
                width: '100%',
              }}
              renderItem={({item, index}) => (
              <PopularBusinessCard key={index} business={item} mgLeftValue={0}/>
            )}/>
          }
          {/* {favIds?.map((item, index) => (<Text key={index}>{item}</Text>))} */}
        </View>
      }
      
    </View>
  )
}