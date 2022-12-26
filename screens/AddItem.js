import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SMTextInput from '../component/SMTextInput'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import style from '../styling'

const AddItem = () => {
  return (
    <View>
      <View style={[style.bgDark, { paddingVertical: 10 }]}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Item</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 25 }}>
        <View style={{ width: '80%' }}>
          <SMTextInput placeholder='Name' style={[styles.input]} />
          <SMTextInput placeholder='Price' style={[styles.input]} />
        </View>
        <SMTouchableOpacity value='Add' touchableStyle={[style.bgDark, { width: '20%', paddingVertical: 5 }]} textStyle={[style.colorWhite, { textAlign: 'center' }]} />
      </View>
    </View>
  )
}

export default AddItem

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    // borderRadius: 10,
    paddingBottom: 5,
    marginBottom: 5
  }
})