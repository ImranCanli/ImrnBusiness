import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import BottomSheet from '../../YedekComponents/BottomSheet'
import { Colors } from '../../constants/Colors'

export default function profile() {

  const [infoText, setInfoText] = useState('');
  const ref = useRef(null);

  
  const onInfoPress = useCallback((context) => {
    setInfoText(context);
    const isActive = ref?.current?.isActive();

    if(isActive){
      ref?.current.scrollTo(0);
    }else{
      ref?.current.scrollTo(-500);
    }
  }, [])

  const KVKK = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  const gizlilik = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';
  return (
    <GestureHandlerRootView style={{flex: 1}}>
        <View style={{
          padding: 20,
          paddingTop: 40,
        }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 35,
          }}>Profilim</Text>
          <UserIntro />
          <MenuList />
            <View style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginTop: 20,
            }}>
              <TouchableOpacity style={{
                width: '45%',
                backgroundColor: '#fff',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }} onPress={() => onInfoPress(KVKK)}>
                <Text style={{ 
                  fontFamily: 'outfit-medium',
                  color: Colors.GRAY,
                }}>
                  KVKK Metni
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                width: '45%',
                backgroundColor: '#fff',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                }} onPress={() => onInfoPress(gizlilik)}
              >
                <Text style={{
                    fontFamily: 'outfit-medium',
                    color: Colors.GRAY,
                  }}
                >
                  Gizlilik ve Şartlar
                </Text>
              </TouchableOpacity>
            </View>
          <BottomSheet ref={ref}>
            <View style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              padding: 20,
            }}>
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 13,
                color: Colors.GRAY,
                textAlign: 'left',
                width: '100%',
              }}>{infoText}</Text>
            </View>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
  )
}