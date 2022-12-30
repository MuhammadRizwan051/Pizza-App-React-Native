import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import style from '../styling'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import SMTouchableOpacity from '../component/SMTouchableOpacity'


const MyCart = () => {
    let [list, setList] = useState([])
    let [dataLoader, setDataLoader] = useState(false)
    let [loader, setLoader] = useState(false)
    let [count, setCount] = useState()

    let getData = () => {
        setDataLoader(true)
        database().ref('addToCart').on('value', dt => {
            if (dt.exists()) {
                setDataLoader(false)
                let li = Object.values(dt.val())
                setList([...li])
            }
            else {
                setDataLoader(false)
            }
        })
    }
    useEffect(() => {
        getData()
    }, [])


    let remove = async (e) => {
        await database().ref(`addToCart/${e.id}`).remove()
        console.log(e)
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

    let clearAll = async () => {
        await database().ref(`addToCart/`).remove()
        setList([])
        console.log()
    }

    let checkout = () => {
        list.unshift(database().ref('addItem/').push().key)
        database().ref(`orders/${list[0]}`).set(list)
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

    return (
        <>
            <View style={[style.bgDark, { paddingVertical: 10 }]}>
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>My Cart</Text>
            </View>
            {dataLoader ? <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={60} color='red' />
            </View>
                :
                (list.length > 0 ?
                    <>
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
                            <Text style={{ color: 'black' }}>Cart Items</Text>
                            <TouchableOpacity onPress={clearAll} >
                                <Text style={{ color: 'black' }}>Clear All</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, paddingVertical: 5, height: '80%' }}>
                            <ScrollView>
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
                                                <TouchableOpacity onPress={() => remove(e)}>
                                                    <Text style={{ textDecorationLine: 'underline', color: 'royalblue' }}>Remove</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: '10%', justifyContent: 'space-around', alignItems: 'center' }}>
                                                <Icon onPress={() => add(e)} name='add' size={16} color='white' style={{ padding: 1, backgroundColor: '#DC3535', borderRadius: 6 }} />
                                                <Icon onPress={() => subtract(e)} name='remove' size={16} color='white' style={{ padding: 1, backgroundColor: '#DC3535', borderRadius: 6 }} />
                                            </View>
                                        </View>
                                    </View>
                                ))
                                }
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', paddingHorizontal: 20, position: 'absolute', bottom: 10 }}>
                            <SMTouchableOpacity onPress={checkout} value={loader ? <ActivityIndicator size='large' color='white' /> : 'Checkout'}
                                touchableStyle={{ borderRadius: 5, backgroundColor: '#367E18', width: '100%', paddingVertical: 10 }}
                                textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
                        </View>
                    </>
                    :
                    <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 32 }}>Cart is Empty</Text>
                    </View>
                )
            }
        </>
    )
}

export default MyCart