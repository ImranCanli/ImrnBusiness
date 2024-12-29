import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from '../constants/Colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../configs/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';


export default function Reviews({business}) {

    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState();
    const {user} = useUser();

    const onSubmit = async () => {
        const docRef = doc(db, 'businessList', business.id);
        await updateDoc(docRef, {
            reviews: arrayUnion({
                reting: rating,
                comment: userInput,
                userName: user?.fullName,
                userImage: user?.imageUrl,
                userEmail: user?.primaryEmailAddress?.emailAddress,
            })
        })
        ToastAndroid.show('Değerlendirme başarıyla eklendi', ToastAndroid.BOTTOM);
    }
    
  return (
    <View style={{
        padding: 20,
        backgroundColor: '#fff',
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20,
        marginBottom: 10,
      }}>Değerlendirme</Text>

      <View>
        <Rating
            showRating={false}
            imageSize={20}
            onFinishRating={(rating) => setRating(rating)}
            style={{ 
                paddingVertical: 10,
                marginBottom: 10,
                alignItems: 'flex-start',
             }}
        />
        <TextInput
        onChangeText={(value) => setUserInput(value)}
        placeholder='Aldığınız hizmeti değerlendirin.'
        numberOfLines={5}
        style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: Colors.GRAY,
            textAlignVertical: 'top'
        }}/>
        <TouchableOpacity style={{
            backgroundColor: userInput? Colors.PRIMARY : Colors.GRAY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderRadius: 15,
            marginVertical: 10,
        }}
        disabled={!userInput}
        onPress={() => onSubmit()}>
            <Text style={{
                color: '#fff',
                fontFamily: 'outfit-bold',
                fontSize: 18,
            }}>
                Gönder
            </Text>
        </TouchableOpacity>
      </View>

      <View style={{
        marginTop: 40,
      }}>
        {business?.reviews?.map((item, index) => (
            <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 25,
                    alignItems: 'center',
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: Colors.GRAY,
                    padding: 10,
                }}
                key={index}
            >
                <Image source={{uri:item.userImage}} 
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 99,
                    }}
                />
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 5,

                }}>
                    <Text style={{
                        fontFamily: 'outfit-medium'
                    }}>
                        {item.userName}
                    </Text>
                    <Rating 
                        imageSize={20}
                        ratingCount={item.reting}
                        readonly={true}
                        style={{alignItems: 'flex-start'}}
                    />
                    <Text style={{
                        color: Colors.GRAY,
                    }}>
                        {item.comment}
                    </Text>
                </View>
            </View>
        ))}
      </View>
    </View>
  )
}