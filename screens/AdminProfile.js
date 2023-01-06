import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Touchable, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../styling'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
// import { utils } from '@react-native-firebase/app'
// import storage from '@react-native-firebase/storage';


const AdminProfile = ({ navigation }) => {

  let [photo, setPhoto] = useState(require('../config/assets/MuhammadRizwan.jpg'))
  let [login, setLogin] = useState({})
  let [loader, setLoader] = useState(false)

  //   let remove = async (e) => {
  //     await database().ref(`addToCart/${e.id}`).remove()
  //     console.log(e)
  // }


  let getData = async () => {
    const jsonValue = await AsyncStorage.getItem('LoginKey')
    const data = jsonValue !== null ? JSON.parse(jsonValue) : null
    console.log(data)
    data && setLogin(data)
  }

  let removeAsyncData = async () => {
    try {
      const removeVal = await AsyncStorage.removeItem('LoginKey');
      console.log('LoginKey remove')
      // return true;
    }
    catch (exception) {
      console.log('LoginKey not remove')
      // return false;
    }
  }

  let logoutUser = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        removeAsyncData()
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  let deleteUser = async () => {
    setLoader(true)
    try {
      await database().ref(`appUsers/${login.id}`).remove()
      setLoader(false)
      ToastAndroid.show('User has been deleted', ToastAndroid.SHORT)
      navigation.navigate('Signup')
      console.log('id', id)
    }
    catch (err) {
      setLoader(false)
      console.log(err)
    }
  }
  console.log(login.id)

  // let uploadImage = async () => {
  //   try{

  //     // path to existing file on filesystem
  //     const reference = storage().ref('../config/assets/MuhammadRizwan.jpg');
  //     const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/../config/assets/MuhammadRizwan.jpg`;
  //     // uploads file
  //     await reference.putFile(pathToFile);
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  useEffect(() => {
    getData()
    // uploadImage()
  }, [])
  console.log('login', login)

  return (
    <>
      <View style={[style.bgDark, { paddingVertical: 10 }]}>
        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Profile</Text>
      </View>
      <View style={{ height: '100%' }}>
        <ScrollView>

          <View style={{ marginTop: 5, paddingVertical: 10 }}>
            <View style={{ borderRadius: 50, flexDirection: 'row' }}>
              <View style={{ width: '90%', alignItems: 'center', paddingStart: '10%' }}>
                <Image source={photo} style={{ borderRadius: 50, height: 80, width: 80 }} />
              </View>
              <View style={{ width: '10%', alignItems: 'center', justifyContent: 'space-around' }}>
                <TouchableOpacity>
                  <Icon name='edit' size={30} color='#DC3535' />
                </TouchableOpacity>
                <TouchableOpacity onPress={deleteUser}>
                  <Icon name='delete' size={30} color='#DC3535' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>
              <View style={{ shadowColor: "rgba(0,0,0,.5)", elevation: 5, justifyContent: 'center', backgroundColor: 'white', width: '90%', borderRadius: 20, marginTop: 10, paddingVertical: 20 }}>
                <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Personal Information</Text>
                <View style={[styles.detailContainer]}>
                  <Text style={[styles.infoKey]}>Name:</Text>
                  <Text style={[styles.infoValue]}>{login.userName}</Text>
                </View>
                <View style={[styles.detailContainer]}>
                  <Text style={[styles.infoKey]}>Email:</Text>
                  <Text style={[styles.infoValue]}>{login.email}</Text>
                </View>
                <View style={[styles.detailContainer]}>
                  <Text style={[styles.infoKey]}>Password:</Text>
                  <Text style={[styles.infoValue]}>{login.password}</Text>
                </View>
                <View style={[styles.detailContainer]}>
                  <Text style={[styles.infoKey]}>Contact:</Text>
                  <Text style={[styles.infoValue]}>{login.contact}</Text>
                </View>
                <View style={[styles.detailContainer]}>
                  <Text style={[styles.infoKey]}>Account:</Text>
                  <Text style={[styles.infoValue]}>{login.category}</Text>
                </View>
              </View>
            </View>

          </View>

          <TouchableOpacity style={{ alignItems: 'center', marginTop: 15, shadowColor: "rgba(0,0,0,.5)", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 5 }}>
            <View style={{ width: '90%', borderRadius: 20, flexDirection: 'row', backgroundColor: 'white' }}>
              <View style={{ width: '15%', borderTopLeftRadius: 18, borderBottomLeftRadius: 18, alignItems: 'center', backgroundColor: '#DC3535', paddingVertical: 15 }}>
                <Icon name='grading' size={30} color='white' />
              </View>
              <View style={{ width: '85%', justifyContent: 'center', marginStart: 15 }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Delivered Orders</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: 'center', marginTop: 15, shadowColor: "rgba(0,0,0,.5)", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.32, shadowRadius: 5.46, elevation: 5 }}>
            <View style={{ width: '90%', borderRadius: 20, flexDirection: 'row', backgroundColor: 'white' }}>
              <View style={{ width: '15%', borderTopLeftRadius: 18, borderBottomLeftRadius: 18, alignItems: 'center', backgroundColor: '#DC3535', paddingVertical: 15 }}>
                <Icon name='pending' size={30} color='white' />
              </View>
              <View style={{ width: '85%', justifyContent: 'center', marginStart: 15 }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Pending Orders</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Logout */}
      <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' }}>
        <TouchableOpacity onPress={logoutUser} style={{ borderRadius: 25, width: '90%', backgroundColor: '#DC3535', paddingVertical: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <Icon name='logout' size={20} color='white' />
          </View>
          <Text style={{ marginLeft: 10, justifyContent: 'center', fontSize: 20, color: 'white' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default AdminProfile

const styles = StyleSheet.create({
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 12,
  },
  infoKey: {
    fontSize: 16,
    width: '40%',
    color: 'black'
  },
  infoValue: {
    fontSize: 16,
    width: '60%',
  }
})