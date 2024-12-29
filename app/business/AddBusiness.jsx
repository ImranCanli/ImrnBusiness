import { View, Text, Image, TextInput, ToastAndroid, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, query, setDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../configs/FirebaseConfig';
import { ScrollView } from 'react-native';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';


export default function AddBusiness() {

    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);

    const {user} = useUser();

    const [businessName, setName] = useState();
    const [businessAdress, setAdress] = useState();
    const [businessContact, setContact] = useState();
    const [businessWebsite, setWebsite] = useState();
    const [businessAbout, setAbout] = useState();
    const [businessCategory, setCategory] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Yeni iş ekle',
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
        GetCategoryList();
    }, []);

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          setImage(result?.assets[0].uri);
    }

    // const getCategoryList = async () => {

    //     setCategoryList([]);
    //     const q = query(collection(db, 'Category'));
    //     const snapShot = await getDocs(q);

    //     snapShot.forEach((doc) => {
    //         console.log(doc.data());
    //         setCategoryList(prev => [...prev, {
    //             label: doc.data().name,
    //             value: doc.data().name
    //         }])
    //     })
    // }

    const GetCategoryList=async()=>{
        setCategoryList([])
        const q=query(collection(db,'Category'));
        const snapShot=await getDocs(q);

        snapShot.forEach((doc)=>{
            // console.log(doc.data());
            setCategoryList(prev=>[...prev,{
                label:(doc.data())?.name,
                value:(doc.data())?.name,
            }])
        })
    }

    const addNewBusiness = async () => {

        setLoading(true);
        const fileName = Date.now().toString()+'.jpg';
        const response = await fetch(image);

        console.log('buralarda biryerde bir sıkıntı var amma ne ?');

        const blob = await response.blob();
        const imageRef = ref(storage,'imrn-business/'+fileName);

        uploadBytes(imageRef, blob).then((snapShot) => {
            console.log('Dosya yüklenidi...');
        }).then(resp => {
            getDownloadURL(imageRef).then(async(downloadUrl) => {
                console.log(downloadUrl);
                saveDocument(downloadUrl);
            })

        })
        //setLoading(false);
    }

    const saveDocument = async (businessImageUrl) => {

        try {
            await setDoc(doc(db, 'businessList', Date.now().toString()), {
                name: businessName,
                ardess: businessAdress,
                contact: businessContact,
                about: businessAbout,
                website: businessWebsite,
                category: businessCategory,
                imageUrl: businessImageUrl,
                username: user?.fullName,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userImage: user?.imageUrl,
            });
            setLoading(false);
            ToastAndroid.show('Yeni iş eklendi.', ToastAndroid.BOTTOM)
        } catch (error) {
            console.log(error); 
            ToastAndroid.show('Hata oluştu.', ToastAndroid.BOTTOM);
        }
    }

  return (
    <ScrollView style={{padding: 30}}>

      <Text style={{fontFamily: 'outfit-bold', fontSize: 25}}>Yeni İş Ekleyin</Text>
      <Text style={{fontFamily: 'outfit-medium', fontSize: 15, color: Colors.GRAY}}>İş Eklemek için lütfen gerekli alanları doldurun.</Text>
      <TouchableOpacity style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10,
            backgroundColor: Colors.LIGHTBG,
            marginTop: 30,
            marginBottom: 20,
            width: 100,
            height: 100,
            minWidth: 'min-content',
        }} 
        onPress={() => onImagePick()}>
            {!image ? 
                <Image source={require('./../../assets/images/camera.png')} style={{width: '100%', height: '100%'}}/> 
            : 
                <Image source={{uri:image}} style={{width: '100%', height: '100%', borderRadius: 8}}/>
            }
      </TouchableOpacity>

      <View>
        <TextInput placeholder='İsim' style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            marginTop: 10,
        }} onChangeText={(v) => setName(v)}/>
        <TextInput placeholder='Adres' style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            marginTop: 10,
        }} onChangeText={(v) => setAdress(v)}/>
        <TextInput placeholder='İletişim' style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            marginTop: 10,
        }} onChangeText={(v) => setContact(v)}/>
        <TextInput placeholder='Web' style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            marginTop: 10,
        }} onChangeText={(v) => setWebsite(v)}/>
        <TextInput placeholder='Hakkında' multiline numberOfLines={5} style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            marginTop: 10,
            height: 120,
            textAlignVertical: 'top',
        }} onChangeText={(v) => setAbout(v)}/>

        <View style={{
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: '#fff',
            borderColor: Colors.PRIMARY,
            fontFamily: 'outfit',
            marginTop: 10,
        }}>
            <RNPickerSelect
                onValueChange={(v) => setCategory(v)}
                items={categoryList}
                placeholder={{label: 'Bir Kategori Seçin', value: null}}
            />
        </View>
      </View>

        <TouchableOpacity disabled={loading} 
        style={{
           width: '100%',
           borderRadius: 10,
           backgroundColor: loading? Colors.GRAY : Colors.PRIMARY,
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           padding: 10,
           marginHorizontal: 'auto',
           marginVertical: 30, 
           marginBottom: 80,
        }} onPress={() => addNewBusiness()}>
            {loading? <ActivityIndicator size={'large'} color={'#fff'}/> :          
            <Text style={{
                color: '#fff',
                fontFamily: 'outfit-bold',
                fontSize: 18,
            }}>Kaydet</Text>}
        </TouchableOpacity>

        <View style={{width: 200}}></View>
    </ScrollView>
  )
}