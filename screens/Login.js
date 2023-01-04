import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import SMTextInput from '../component/SMTextInput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database'
import style from '../styling';


function Login({ navigation }) {
  let initialData = {
    email: '',
    password: ''
  }
  const [model, setModel] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false)

  // let category;
  let loginuser = () => {
    setIsLoading(true)

    auth().signInWithEmailAndPassword(model.email, model.password)
      .then(res => {
        const user = res.user
        database().ref(`appUsers/${user.uid}`).on('value', dt => {
          // category = dt.val().category

          const storeData = async () => {
            try {
              const jsonValue = JSON.stringify(dt.val())
              await AsyncStorage.setItem('LoginKey', jsonValue)
              setModel(initialData)
              setIsLoading(false)
              ToastAndroid.show('Login Successfully', ToastAndroid.SHORT)
              navigation.navigate('HomeScreen')
              console.log('Data stored', jsonValue)
            } catch (e) {
              // saving error
              ToastAndroid.show('Please! try again', ToastAndroid.SHORT)
              console.log('Data not stored', e)
            }
          }
          storeData()
        })
      })
      .catch(err => {
        setModel(initialData)
        setIsLoading(false)
        console.log(err)
      })
  }

  return (
    <>
      <View style={[style.bgDark, { height: '100%' }]}>
        <ScrollView>
          <View style={{ borderWidth: 10, borderRadius: 40, backgroundColor: 'white', borderColor: '#DC3535', alignItems: 'center', marginVertical: '40%', paddingVertical: 40 }}>
            <Text style={{ color: '#DC3535', fontWeight: 'bold', fontSize: 26 }}>LOGIN</Text>
            <Icon name='person' size={90} color='#DC3535' />

            <View style={[styles.inputContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name='email' size={20} color='white' />
              </View>
              <SMTextInput value={model.email} style={[styles.input]} placeholder="Email" placeholderTextColor='grey' onChangeText={e => setModel({ ...model, email: e })} />
            </View>

            <View style={[styles.inputContainer]}>
              <View style={[styles.iconContainer]}>
                <Icon name='lock' size={20} color='white' />
              </View>
              <SMTextInput value={model.password} secureTextEntry={true} style={[styles.input]} placeholder="Password" placeholderTextColor='grey' onChangeText={e => setModel({ ...model, password: e })} />
            </View>

            <View style={{ width: '40%', marginTop: 50, justifyContent: 'center' }}>
              <TouchableOpacity onPress={loginuser} style={[style.bgDark, { paddingVertical: 8, borderRadius: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>{isLoading ? <ActivityIndicator size={25} color="white" /> : 'LOGIN'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'black' }}>
                Need an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Signup');
                }}
              >
                <Text style={[style.colorDark, { textAlign: 'center', fontWeight: 'bold' }]}>
                  SIGN UP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#DC3535',
    paddingBottom: 0,
    marginTop: 15
  },
  iconContainer: {
    justifyContent: 'center',
    backgroundColor: '#DC3535',
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    width:'12%',
    alignItems:'center',
    paddingVertical: 7,
  },
  input: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    fontSize: 16,
    width: '87%',
  }
})