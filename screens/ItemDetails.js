import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import style from '../styling'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

const ItemDetails = ({ navigation, route }) => {
  let obj = route.params
  let [isLoading, setIsLoading] = useState(false)

  let addToCart = () => {
    console.log('Item added')
  }

  return (
    <View>
      <View style={{ height: '40%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image resizeMode='contain' style={{ height: 250, width: '90%', borderRadius: 10, }} source={{ uri: 'https://pizzamax.com.pk/_next/image?url=https%3A%2F%2Fem-cdn.eatmubarak.pk%2F55083%2Fdish_image%2F1658491791.jpg&w=1920&q=100' }} />
      </View>
      <View style={[style.bgDark, { borderTopRightRadius: 40, borderTopLeftRadius: 40, height: '60%', paddingTop: 40 }]}>
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 34, color: 'white', textAlign: 'center' }}>{obj.name}</Text>
          <Icon name='favorite' size={30} color='white' />
        </View>
        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 16, color: 'lightgrey', marginTop: 10 }}>{obj.price}/- PKR</Text>
        <View style={{ alignItems: 'center', position: 'absolute', bottom: 40, left: 0, right: 0 }}>
          <SMTouchableOpacity onPress={addToCart} value='Add To Cart'
            touchableStyle={[style.bgWhite, { width: '70%', paddingVertical: 10, borderRadius: 20 }]}
            textStyle={[style.colorDark, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
        </View>
      </View>
    </View>
  )
}

export default ItemDetails