import { View, Text, StyleSheet, ToastAndroid, ActivityIndicator, TouchableOpacity, PermissionsAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import SMTextInput from '../component/SMTextInput'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import style from '../styling'
import database from '@react-native-firebase/database'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'


const AddItem = () => {

  let [isLoading, setIsLoading] = useState(false)
  let [model, setModel] = useState(initialData)
  // let [cameraPhoto, setCameraPhoto] = useState(require('../config/assets/DummyImage.png'))
  let [cameraPhoto, setCameraPhoto] = useState('data:image/png;base64,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');
  let [galleryPhoto, setGalleryPhoto] = useState()


  const initialData = {
    name: '',
    price: '',
    id: ''
  }


  let add = () => {
    setIsLoading(true)
    model.id = database().ref('addItem/').push().key
    model.src = cameraPhoto
    database().ref(`addItem/${model.id}`).set(model)
      .then(res => {
        setIsLoading(false)
        setModel(initialData)
        ToastAndroid.show('Item created Successfully', ToastAndroid.LONG)
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }


  let options = {
    saveToPhotos: true,
    mediaType: 'photo'
  }

  let opencamera = async () => {
    await launchCamera(options, (res) => {
      setCameraPhoto(res.assets[0].uri)
      console.log(res)
    });
  }

  let openGallery = () => {
    launchImageLibrary(options, (res) => {
      setCameraPhoto(res.assets[0].uri)
      console.log(res)
    })
  }


  // setCameraPhoto(res.assets[0].uri)
  // console.log(res)
  // const granted = await PermissionsAndroid.request(
  //   PermissionsAndroid.PERMISSIONS.CAMERA,
  // )
  // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //   const result = await launchCamera(options, res => {
  //     console.log(res)
  //   })
  //   setCameraPhoto(result.assets[0].uri)
  // }

  // let opencamera = async () => {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA,
  //   )
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     const result = await launchCamera(options)
  //     setCameraPhoto(result.assets[0].uri)
  //   }
  // }

  return (
    <View>
      <View style={[style.bgDark, { paddingVertical: 10 }]}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add Item</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 25 }}>
        <View style={{ width: '80%' }}>
          <SMTextInput value={model.name} placeholder='Name' style={[styles.input]} onChangeText={e => setModel({ ...model, name: e })} />
          <SMTextInput value={model.detail} placeholder='Detail' style={[styles.input]} onChangeText={e => setModel({ ...model, detail: e })} />
          <SMTextInput keyboardType='number-pad' value={model.price} placeholder='Price' style={[styles.input]} onChangeText={e => setModel({ ...model, price: e })} />
          <View>
            <TouchableOpacity onPress={opencamera}>
              <Icon name='photo-camera' size={20} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery}>
              <Icon name='tab' size={20} color='black' />
            </TouchableOpacity>
          </View>
          <Image source={{ uri: cameraPhoto }} resizeMode='stretch' style={{ height: 200, width: '100%' }} />
          {/* <Image source={cameraPhoto} style={{ height: 100, width: 150 }} /> */}
        </View>
        <SMTouchableOpacity onPress={add} value={isLoading ? <ActivityIndicator color='white' size={30} /> : 'Add'} touchableStyle={[style.bgDark, { width: '80%', marginTop: 15, borderRadius: 20, paddingVertical: 8 }]} textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20, textStyle: 'italic' }]} />
      </View>
    </View >
  )
}

export default AddItem

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 5
  }
})