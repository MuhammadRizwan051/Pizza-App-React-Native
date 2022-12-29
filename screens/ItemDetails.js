import { View, Text, Image, ToastAndroid, ActivityIndicator, ScrollView, TouchableOpacity, Modal, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import style from '../styling'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import database from '@react-native-firebase/database'
import SMTextInput from '../component/SMTextInput'

const ItemDetails = ({ navigation, route }) => {
  let [loader, setLoader] = useState(false)
  let [count, setCount] = useState(1)
  const [modalVisible, setModalVisible] = useState(false);
  let [instruction, setinstruction] = useState('')
  let obj = route.params

  let addToCart = () => {
    setLoader(true)
    obj.src = 'https://www.pizzapoint.com.pk/upload/1666936269-Chicken%20Max.jpeg'
    obj.specialInstruction = instruction
    obj.quantity = count
    obj.id = database().ref('addToCart/').push().key
    database().ref(`addToCart/${obj.id}`).set(obj)
      .then(res => {
        setLoader(false)
        ToastAndroid.show('Item add to Cart', ToastAndroid.LONG)
        navigation.navigate('Home')
        obj = {}
      })
      .catch(err => {
        setLoader(false)
        obj = {}
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
          <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'black', textAlign: 'center', fontFamily: 'lucida-sans' }}>{obj.name.toUpperCase()}</Text>
          <TouchableOpacity>
            <Icon name='favorite-border' size={30} color='#DC3535' />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>Rs {obj.price}</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, lineHeight: 23 }}>{obj.detail}</Text>
        </View>
        <View style={{ borderWidth: 1, width: '100%', height: 400, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
          <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: 'https://www.pizzapoint.com.pk/upload/1666936269-Chicken%20Max.jpeg' }} />
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 20, color: 'black', fontFamily: 'lucida-sans' }}>Special Instructions</Text>
          <SMTextInput placeholder='Please enter instructions about this item if any' numberOfLines={1} onChangeText={e => setinstruction(e)} style={{ paddingHorizontal: 15, backgroundColor: 'lightgrey' }} />
        </View>
      </ScrollView>


      {/* Add To Cart */}
      <View style={{ borderTopWidth: 1, borderColor: 'grey', backgroundColor: 'white', paddingVertical: 10, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <View style={{ height: '100%', width: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={subtract}>
            <Icon name='remove-circle-outline' size={30} color='#367E18' />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>{count}</Text>
          <TouchableOpacity onPress={add}>
            <Icon name='add-circle-outline' size={30} color='#367E18' />
          </TouchableOpacity>
        </View>
        <View style={{ height: '100%', width: '50%', paddingHorizontal: 20 }}>
          <SMTouchableOpacity onPress={addToCart} value={loader ? <ActivityIndicator size='large' color='white' /> : 'Add To Cart'}
            touchableStyle={{ borderRadius: 5, backgroundColor: '#367E18', width: '100%', paddingVertical: 10 }}
            textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
        </View>


        {/* Whatsapp Button */}
        <TouchableOpacity style={{ position: 'absolute', bottom: 90, right: 20 }}>
          <Image resizeMode='cover' style={{ height: 50, width: 50 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png' }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default ItemDetails