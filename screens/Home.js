import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../styling'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

const Home = ({ navigation }) => {

  let [dataLoader, setDataLoader] = useState(false)
  let [list, setList] = useState([])
  // let [refreshing, setRefreshing] = useState(false)

  // const wait = (timeout) => {
  //   return new Promise(resolve => setTimeout(resolve, timeout));
  // }

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  let getData = () => {
    setDataLoader(true)
    database().ref('addItem').on('value', dt => {
      setDataLoader(false)
      if (dt.exists()) {
        setDataLoader(false)
        let li = Object.values(dt.val())
        setList([...li])
      }
    })
  }

  useEffect(() => {
    getData()
  }, [])


  let logoutUser = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!')
        navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <View>
        <View style={[style.bgDark, { paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }]}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Home</Text>
          <TouchableOpacity onPress={logoutUser}>
            <Icon name='logout' size={25} color='white' />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: 'white', height: 200, marginVertical: 15, paddingHorizontal: 10 }}>
          <Image resizeMode='contain' style={{ width: '100%', height: '100%' }} source={{ uri: 'https://t3.ftcdn.net/jpg/02/92/08/20/240_F_292082032_oxXr6P0OARzxfrjHM5R8QJ4BchsBfxFK.jpg' }} />
        </View>
        {/* Whatsapp Button */}
        <TouchableOpacity style={{ zIndex:1, position: 'absolute', bottom: 30, right: 20 }}>
          <Image resizeMode='cover' style={{ height: 50, width: 50 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3670/3670051.png' }} />
        </TouchableOpacity>
        {dataLoader ? <View style={{ height: '100%', justifyContent: 'center' }}>
          <ActivityIndicator size={60} color='red' />
        </View>
          :
          <View style={{ height: '64%' }}>
            <ScrollView>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 5 }}>
                {list.length > 0 ? list.map((e, i) => (
                  <TouchableOpacity onPress={() => navigation.navigate('Item Details', e)} style={{ width: '50%', paddingHorizontal: 5, marginTop: 20 }} key={i}>
                    <View style={{ borderRadius: 10, borderWidth: 2, borderColor: '#DC3535', backgroundColor: 'white' }}>
                      <View style={{ alignItems: 'center' }}>
                        <Image resizeMode='stretch' style={{ height: 150, width: '100%', borderTopRightRadius: 7, borderTopLeftRadius: 7 }} source={{ uri: 'https://www.pizzapoint.com.pk/upload/1666936269-Chicken%20Max.jpeg' }} />
                      </View>
                      <View style={{ paddingVertical: 10 }}>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16, color: 'black' }}>{e.name.toUpperCase()}</Text>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 14, color: 'grey' }}>{e.price}/- PKR</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
                  : (
                    <View>
                      {/* <View style={{ borderWidth: 1, height: '100%' }}> */}
                      <Text>No Data</Text>
                      {/* </View> */}
                    </View>
                  )
                }
              </View>
            </ScrollView>
          </View>
        }
      </View>
    </>
  )
}

export default Home