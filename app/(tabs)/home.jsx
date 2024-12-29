import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from './../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from './../../components/Home/PopularBusiness'

export default function home() {
  return (

  <View style={{ flex: 1 }}>
    {/* Sabit kalan Header */}
    <Header />

    {/* Kaydırılabilir içerikler */}
    <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
      <Slider />
      <Category />
      <PopularBusiness />
    </ScrollView>
  </View>

    // <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
    // <View>
    //   <Header></Header>
    //   <Slider></Slider>
    //   <Category></Category>
    //   <PopularBusiness></PopularBusiness>
    // </View>
    // </ScrollView>
  )
}