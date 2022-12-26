import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import style from '../styling'
import SMTouchableOpacity from '../component/SMTouchableOpacity'

const ItemDetails = ({ navigation, route }) => {
  let obj = route.params
  let [isLoading, setIsLoading] = useState(false)

  return (
    <View>
      <View style={{ height: '40%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Image resizeMode='contain' style={{ height: 250, width: '90%', borderRadius: 10, }} source={{ uri: 'https://pizzamax.com.pk/_next/image?url=https%3A%2F%2Fem-cdn.eatmubarak.pk%2F55083%2Fdish_image%2F1658491791.jpg&w=1920&q=100' }} />
      </View>
      <View style={[style.bgDark, { borderTopRightRadius: 40, borderTopLeftRadius: 40, height: '60%', paddingTop: 40 }]}>
        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 34, color: 'white', textAlign:'center' }}>{obj.name}</Text>
        <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 14, color: 'white' }}>{obj.price}/- PKR</Text>
        <View style={{ alignItems: 'center', position: 'absolute', bottom: 25, left: 0, right: 0 }}>
          <SMTouchableOpacity value={isLoading ? <ActivityIndicator color='white' size={20} /> : 'Add To Cart'}
            touchableStyle={[style.bgWhite, { width: '70%', paddingVertical: 5, borderRadius: 20 }]}
            textStyle={[style.colorDark, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
        </View>
      </View>
    </View>
  )
}

export default ItemDetails