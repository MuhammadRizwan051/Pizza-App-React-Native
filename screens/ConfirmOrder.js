import { View, Text, Image } from 'react-native'
import React from 'react'
import style from '../styling'
import SMTouchableOpacity from '../component/SMTouchableOpacity'

const ConfirmOrder = ({navigation}) => {
  return (
    <>
      <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginBottom: 50 }}>
          <Image source={{ uri: 'https://cdn3.vectorstock.com/i/1000x1000/18/37/tick-mark-icon-on-red-vector-4681837.jpg' }}
            style={{ height: 120, width: 120, borderRadius: 70 }}
          />
        </View>
        <Text style={[style.colorDark, { fontSize: 22, fontFamily: 'verdana', fontWeight: 'bold', marginBottom: 20 }]}>Congratulations!</Text>
        <Text>Your order has been placed</Text>
        <Text>Order Tracking number is #336988871 </Text>
        <SMTouchableOpacity onPress={navigation.navigate('HomeScreen')} value='Go to Home Page' touchableStyle={[style.bgDark, { marginTop: 40, color: 'white', paddingVertical: 10, paddingHorizontal: 50, borderRadius: 15 }]} textStyle={[style.colorWhite, { fontWeight: 'bold', fontSize: 18 }]} />
      </View>
    </>
  )
}

export default ConfirmOrder