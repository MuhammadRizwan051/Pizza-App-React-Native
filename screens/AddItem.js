import { View, Text } from 'react-native'
import React from 'react'
import SMTextInput from '../component/SMTextInput'
import SMTouchableOpacity from '../component/SMTouchableOpacity'

const AddItem = () => {
  return (
    <View>
      <Text>AddItem</Text>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: '80%' }}>
          <SMTextInput placeholder='Name' style={{ borderWidth: 1 }} />
          <SMTextInput placeholder='Price' style={{ borderWidth: 1 }} />
        </View>
          <SMTouchableOpacity value='Add' touchableStyle={{borderWidth:1, width:'20%'}} textStyle={{textAlign:'center'}} />
      </View>
    </View>
  )
}

export default AddItem