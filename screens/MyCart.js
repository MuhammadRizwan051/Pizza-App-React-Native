import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollViewBase, ScrollView, TouchableOpacity } from 'react-native'
import style from '../styling'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'


const MyCart = () => {
    let [list, setList] = useState([])
    let [count, setCount] = useState()
    let getData = () => {
        database().ref('addToCart').on('value', dt => {
            if (dt.exists()) {
                let li = Object.values(dt.val())
                setList([...li])
            }
        })
    }
    useEffect(() => {
        getData()
    }, [])

    let update = () => {
        database().ref('/users/123').update()
            .then(() => console.log('Data updated.'));
    }

    let remove = async (e) => {
        await database().ref(`addToCart/${e}`).remove();
    }

    let add = (e) => {
        console.log(e)
        let val = e.quantity
        setCount(val + 1)
        e.quantity = count
    }

    let subtract = (e) => {
        console.log('subtract', e)
    }


    return (
        <>
            <View style={[style.bgDark, { paddingVertical: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>My Cart</Text>
            </View>
            <ScrollView style={{ marginTop: 20 }}>
                {list.map((e, i) => (
                    <View key={i} style={{ borderColor: 'grey', paddingVertical: 7, marginHorizontal: 15 }} >
                        <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, backgroundColor: 'white', paddingVertical: 5, width: '100%', flexDirection: 'row' }}>
                            <View style={{ width: '20%' }}>
                                <Image source={{ uri: e.src }} resizeMode='contain' style={{ height: 50, width: '100%' }} />
                            </View>
                            <View style={{ width: '70%', justifyContent: 'center', flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row', width: '85%' }}>
                                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{e.quantity} x </Text>
                                    <Text style={{ fontWeight: 'bold', color: 'black' }}>{e.name}</Text>
                                </View>
                                <View style={{ cursor: 'pointer' }}>
                                    <Text onPress={() => remove(e)} style={{ textDecorationLine: 'underline', color: 'royalblue' }}>Remove</Text>
                                </View>
                            </View>
                            <View style={{ width: '10%', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Icon onPress={() => add(e)} name='add' size={16} color='white' style={{ padding: 1, backgroundColor: '#DC3535', borderRadius: 6 }} />
                                <Icon onPress={() => subtract(e)} name='remove' size={16} color='white' style={{ padding: 1, backgroundColor: '#DC3535', borderRadius: 6 }} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

export default MyCart