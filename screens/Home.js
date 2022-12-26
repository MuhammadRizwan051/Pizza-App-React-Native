import { View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import style from '../styling'
import database from '@react-native-firebase/database'

const Home = ({ navigation }) => {
  let [dataLoader, setDataLoader] = useState(false)
  let [list, setList] = useState([])

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

  return (
    <>
      <View>
        <View style={[style.bgDark, { paddingVertical: 10 }]}>
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>Home</Text>
        </View>
        {dataLoader ? <View style={{ height: '100%', justifyContent: 'center' }}>
          <ActivityIndicator size={60} color='red' />
        </View>
          :
          <ScrollView>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 }} >
              {list.length > 0 ? list.map((e, i) => (
                <TouchableOpacity onPress={() => navigation.navigate('Item Details', e)} style={{ width: '50%', paddingHorizontal: 10, marginTop: 20 }} key={i}>
                  <View style={{ borderRadius: 10, borderWidth: 2, borderColor: '#DC3535', backgroundColor: 'white' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Image resizeMode='stretch' style={{ height: 150, width: '90%', borderRadius: 10, }} source={{ uri: 'https://pizzamax.com.pk/_next/image?url=https%3A%2F%2Fem-cdn.eatmubarak.pk%2F55083%2Fdish_image%2F1658491791.jpg&w=1920&q=100' }} />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                      <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 18, color: 'black' }}>{e.name}</Text>
                      <Text style={{ marginLeft: 20, fontWeight: 'bold', fontSize: 14, color: 'grey' }}>{e.price}/- PKR</Text>
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
        }
      </View>
    </>
  )
}

export default Home