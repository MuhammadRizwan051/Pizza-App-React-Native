import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import SMTextInput from '../component/SMTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database'


function Login({ navigation }) {
  // let [category, setCategory] = useState();
  const [model, setModel] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  let category;
  let loginuser = () => {
    setIsLoading(true)

    auth().signInWithEmailAndPassword(model.email, model.password)
      .then(async res => {
        setIsLoading(false)
        const user = res.user
        await database().ref(`appUsers/${user.uid}`).on('value', dt => {
          category = dt.val().category
          
          const storeData = async () => {
            try {
              await AsyncStorage.setItem('LoginKey', category)
              navigation.navigate('HomeScreen', category)
              console.log('Data stored', category)
            } catch (e) {
              // saving error
              console.log('Data not stored in Async', e)
            }
          }
          storeData()

          let category;
          const getData = async () => {
            try {
              const value = await AsyncStorage.getItem('LoginUser')
              if (value !== null) {
                category = value
                navigation.navigate('HomeScreen', category)
                console.log('logincategory', category)
              }
            } catch (e) {
              console.log(e)
            }
          }
          getData()
        })
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <View style={{ height: '100%', backgroundColor: '#E8C4C4', alignItems: 'center', paddingTop: '30%' }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 26 }}>LOGIN</Text>
        <Icon name='person' size={80} color='black' />
        <View style={{ width: '100%', paddingTop: 25, paddingHorizontal: 20 }}>
          <SMTextInput placeholder="Email" labelColor='grey' placeholderTextColor='black' onChangeText={e => setModel({ ...model, email: e })} />
        </View>
        <View style={{ width: '100%', paddingTop: 25, paddingHorizontal: 20 }}>
          <SMTextInput secureTextEntry={true} placeholder="Password" labelColor='grey' placeholderTextColor='black' onChangeText={e => setModel({ ...model, password: e })} />
        </View>

        <View style={{ width: '100%', paddingTop: 50, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={loginuser} style={{ backgroundColor: '#2B3A55', paddingVertical: 10, borderRadius: 15 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>{isLoading ? <ActivityIndicator size='large' color="white" /> : 'LOGIN'}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16 }}>
            Need an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#2B3A55' }}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
export default Login;