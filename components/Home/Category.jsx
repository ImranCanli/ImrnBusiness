import { View, Text, FlatList, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import Citems from '../../YedekComponents/Citems'
import { useRouter } from 'expo-router'

export default function Category({explore = false, onCategorySelect}) {

    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const [categoryList,setCategoryList]=useState([]);
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    useEffect(()=>{
        GetCategoryList()
    },[])
    const GetCategoryList=async()=>{
        setCategoryList([])
        const q=query(collection(db,'Category'));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,doc.data()])
        })
    }

    const onActivation = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setIsActive((prev) => !prev);
    }

    const onCategortPressHandler=(item)=>{

        if(!explore) {
            router.push('/businesslist/'+item.name);
        }else{
            onCategorySelect(item.name);
        }       
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
            }}>Hizmet Kategorileri
            </Text>
            <TouchableOpacity onPress={() => onActivation()}>
                <Text style={{
                    color: Colors.PRIMARY,
                    fontFamily: 'outfit-medium',
                }}>{isActive? 'Daralt' : 'Tümünü Gör'}</Text>
            </TouchableOpacity>
        </View>
        {isActive? 
            <View style={{
                width: '90%',
                marginHorizontal: 'auto',
                borderRadius: 15,
                backgroundColor: '#fff',
                display: 'flex',
                flexWrap: 'wrap',
                padding: 5,
                paddingLeft: 15,
                flexDirection: 'row',
                rowGap: 10,
                paddingBottom: 30,
            }}>
                {categoryList.map((item, index) =>                     
                <Citems 
                    icon={item.icon}
                    name={item.name}
                    id={item.id} 
                    onCategoryPress={(category)=>
                        onCategortPressHandler(item)}
                    key={index}
                    />)}
            </View> 
        :        
            <FlatList
                data={categoryList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    marginLeft:20,
                }}
                renderItem={({item,index})=>(
                    <Citems 
                    icon={item.icon}
                    name={item.name}
                    id={item.id} 
                    onCategoryPress={(category)=>
                        onCategortPressHandler(item)}
                    key={index}
                    />
                )}
            />
        }
    </View>
  )
}