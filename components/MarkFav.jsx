import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import Shared from './../Shared/Shared'
import { useUser } from '@clerk/clerk-expo';


export default function MarkFav({business}) {

    const {user} = useUser();
    const [favList, setFavList] = useState();

    useEffect(() => {
        user&&GetFavs();
    }, [user]);

    const GetFavs = async () => {
       const result = await Shared.GetFavList(user);
       console.log(result);
       setFavList(result?.favourites? result?.favourites : []);
    }

    const AddToFavs = async () => {
        if (!Array.isArray(favList)) return;
        const favResult = [...favList, business?.id];
        // favResult.push(business?.id);
        await Shared.UpdateFav(user, favourites);
        GetFavs();
    }

    const RemoveFromFavs = async () => {
        if (!Array.isArray(favList)) return;
        const favResult = favList.filter(item => item!=business?.id);
        await Shared.UpdateFav(user, favResult);
        GetFavs();
    }

  return (
    <View>
        {Array.isArray(favList) && favList.includes(business?.id)? 
            <TouchableOpacity style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: 99,
                padding: 10,
            }} onPress={() => RemoveFromFavs()}>
                <Ionicons name="heart" size={30} color="red" />
            </TouchableOpacity>
         : 
            <TouchableOpacity style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: 99,
                padding: 10,
            }} onPress={() => AddToFavs()}>
                <Ionicons name="heart-outline" size={30} color="black" />
            </TouchableOpacity>
         }
    </View>
  )
}