import { View, Text, Image, ToastAndroid, ActivityIndicator, ScrollView, TouchableOpacity, Modal, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import style from '../styling'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import database from '@react-native-firebase/database'
import SMTextInput from '../component/SMTextInput'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ItemDetails = ({ navigation, route }) => {

  let obj = route.params
  // console.log(obj)

  let [loader, setLoader] = useState(false)
  let [count, setCount] = useState(1)
  let [instruction, setinstruction] = useState('')
  let [model, setModel] = useState(obj)

  let [arr, setArr] = useState([])
  // let addToCart = () => {
  //   setLoader(true)
  //   console.log('model', model)

  //   setArr([...arr, model])
  //   const multiSet = [
  //     ["First", JSON.stringify(model)],
  //     // ["@MyApp_USER_2", JSON.stringify(USER_2)]
  //   ]
  //   const storeData = async () => {
  //     try {
  //       const jsonValue = JSON.stringify(arr)
  //       await AsyncStorage.setItem('CartItem', jsonValue)
  //       setModel(obj)
  //       ToastAndroid.show('Add to Cart', ToastAndroid.SHORT)
  //       setLoader(false)
  //       navigation.navigate('HomeScreen')
  //       console.log('Data stored', jsonValue)
  //     }
  //     catch (e) {
  //       setModel(obj)
  //       setLoader(false)
  //       console.log('Data not stored', e)  // saving error
  //     }
  //   }
  //   storeData()
  // }
  // console.log('arr', arr)




  let addToCart = () => {
    setLoader(true)
    model.quantity = count
    model.specialInstruction = instruction
    model.id = database().ref('addToCart/').push().key
    
    database().ref(`addToCart/${model.id}`).set(model)
      .then(res => {
        setLoader(false)
        ToastAndroid.show('Item added to Cart', ToastAndroid.LONG)
        setModel(obj)
        setinstruction('')
        setCount(1)
        navigation.navigate('Home')
      })
      .catch(err => {
        setLoader(false)
        setModel(obj)
        setinstruction('')
        setCount(1)
        console.log(err)
      })
  }





  let add = () => {
    setCount(count + 1)
  }
  let subtract = () => {
    if (count >= 2) {
      setCount(count - 1)
    }
  }

  return (
    <>
      <ScrollView style={{ marginBottom: 100, }}>
        <View style={{ marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'black', textAlign: 'center', fontFamily: 'lucida-sans' }}>{model.name.toUpperCase()}</Text>
          <TouchableOpacity>
            <Icon name='favorite-border' size={30} color='#DC3535' />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>Rs {model.price}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, lineHeight: 23 }}>{model.detail}</Text>
        </View>
        <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center' }}>
          <Image resizeMode='contain' style={{ height: 200, width: '100%' }} source={{ uri: model.src }} />
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 20, color: 'black', fontFamily: 'lucida-sans' }}>Special Instructions</Text>
          <SMTextInput placeholder='Please enter instructions about this item if any' numberOfLines={1} onChangeText={e => setinstruction(e)} style={{ paddingHorizontal: 15, backgroundColor: 'lightgrey' }} />
        </View>
      </ScrollView>

      {/* Whatsapp Button */}
      <TouchableOpacity style={{ position: 'absolute', bottom: 90, right: 20 }}>
        <Image resizeMode='cover' style={{ height: 50, width: 50 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png' }} />
      </TouchableOpacity>


      {/* Add To Cart */}
      <View style={{ borderTopWidth: 1, borderColor: 'grey', backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View style={{ height: '100%', width: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={subtract}>
            <Icon name='remove-circle-outline' size={30} color='#367E18' />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }} onChangeText={e => setCount(e)}>{count}</Text>
          <TouchableOpacity onPress={add}>
            <Icon name='add-circle-outline' size={30} color='#367E18' />
          </TouchableOpacity>
        </View>
        <View style={{ height: '100%', width: '50%', paddingHorizontal: 20 }}>
          <SMTouchableOpacity onPress={addToCart} value={loader ? <ActivityIndicator size={30} color='white' /> : 'Add To Cart'}
            touchableStyle={{ borderRadius: 5, backgroundColor: '#367E18', width: '100%', paddingVertical: 10 }}
            textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
        </View>
      </View>
    </>
  )
}

export default ItemDetails