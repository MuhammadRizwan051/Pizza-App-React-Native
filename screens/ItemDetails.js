import { View, Text, Image, ToastAndroid, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState } from 'react'
import style from '../styling'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import database from '@react-native-firebase/database'
import SMTextInput from '../component/SMTextInput'

const ItemDetails = ({ navigation, route }) => {
  let [loader, setLoader] = useState(false)
  let obj = route.params

  let addToCart = () => {
    setLoader(true)
    obj.id = database().ref('addToCart/').push().key
    database().ref(`addToCart/${obj.id}`).set(obj)
      .then(res => {
        setLoader(false)
        ToastAndroid.show('Item added Successfully', ToastAndroid.LONG)
      })
      .catch(err => {
        setLoader(false)
        console.log(err)
      })
  }

  return (
    <>
      <View style={{ height: '100%' }}>
        <View style={{ height: '92%' }}>
          <View style={{ marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'black', textAlign: 'center', fontFamily: 'lucida-sans' }}>{obj.name.toUpperCase()}</Text>
            <Icon name='favorite' size={30} color='#DC3535' />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginTop: 5 }}>Rs {obj.price}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20, lineHeight: 23 }}>Rs {obj.detail}</Text>
          </View>
          <View style={{ borderWidth: 1, width: '100%', height: '40%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Image resizeMode='cover' style={{ height: '100%', width: '100%' }} source={{ uri: 'https://www.pizzapoint.com.pk/upload/1666936269-Chicken%20Max.jpeg' }} />
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={{ marginBottom: 8, fontWeight: 'bold', fontSize: 20, color: 'black', fontFamily: 'lucida-sans' }}>Special Instructions</Text>
            <SMTextInput placeholder='Please enter instructions about this item if any' numberOfLines={1} style={{ paddingHorizontal: 15, backgroundColor: 'lightgrey' }} />
          </View>
        </View>
        <View style={{ height: '8%', borderTopWidth: 1, borderColor: 'grey', paddingVertical: 10, flexDirection: 'row', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <View style={{ height: '100%', width: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
            <Icon name='favorite' size={30} color='#DC3535' />
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>1</Text>
            <Icon name='favorite' size={30} color='#DC3535' />
          </View>
          <View style={{ height: '100%', width: '50%', paddingHorizontal: 20 }}>
            <SMTouchableOpacity onPress={addToCart} value={loader ? <ActivityIndicator size='large' color='#DC3535' /> : 'Add To Cart'}
              touchableStyle={[style.bgGreen, { width: '100%', paddingVertical: 10 }]}
              textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
          </View>
        </View>
      </View>
    </>
  )
}

export default ItemDetails