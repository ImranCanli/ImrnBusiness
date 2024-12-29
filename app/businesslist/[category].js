import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { db } from '../../configs/FirebaseConfig';


export default function BusinessListByCategory() {

    const navigation = useNavigation();
    const {category} = useLocalSearchParams();
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            headerShown:true,
            headerTitle:category,
            
            headerStyle: {
                backgroundColor: Colors.PRIMARY,
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 21,
                fontFamily: 'outfit-bold',
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerBackImage: () => (
                // <Image source={require('./../../assets/images/previous.png')}/>
                <Icon
                    name="arrow-back"
                    size={30}
                    color="#fff"
                />
            ),
        });
        getBusinessList();
    }, []);

    const getBusinessList = async () => {

        setBusinessList([]);
        setLoading(true);

        const q = query(collection(db, 'businessList'), where("category", '==', category));
        const querySnapShot = await getDocs(q);

        querySnapShot.forEach((doc) => {
            setBusinessList( prev => [...prev, {id: doc.id, ...doc.data()}]);
        });
        setLoading(false);
    }

  return (
    <View>

    {businessList?.length > 0 && loading == false ? 
     <FlatList data={businessList}
     onRefresh={getBusinessList}
     refreshing={loading}
      renderItem={({item, index}) => (
        <BusinessListCard business={item} key={index}/>
      )}/> : 
      loading ? <ActivityIndicator
        style={{
            marginTop: '60%',
        }}
        size={'large'}
        color={Colors.PRIMARY}
      /> : 
      <Text style={{
        fontSize: 20,
        fontFamily: 'outfit-bold',
        color: Colors.GRAY,
        textAlign: 'center',
        marginTop: '50%',
      }}
      >Gösterilecek iş bulunamadı</Text>
    }
    </View>
  )
}