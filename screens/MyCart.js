import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid, StyleSheet } from 'react-native'
import style from '../styling'
import database from '@react-native-firebase/database'
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import SMTouchableOpacity from '../component/SMTouchableOpacity'
import SMTextInput from '../component/SMTextInput'
import AsyncStorage from '@react-native-async-storage/async-storage'


const MyCart = ({ navigation }) => {
    let [list, setList] = useState([])
    let [dataLoader, setDataLoader] = useState(false)
    let [checkoutLoader, setCheckoutLoader] = useState(false)
    let [count, setCount] = useState()
    let [login, setLogin] = useState()


    let getLoginData = async () => {
        const jsonValue = await AsyncStorage.getItem('LoginKey')
        const data = jsonValue !== null ? JSON.parse(jsonValue) : null
        setLogin(data.id)
    }
    // console.log('mycartid', login)
    let val = login

    useEffect(() => {
        getLoginData()
    }, [])


    let getData = async () => {
        setDataLoader(true)
        database().ref(`addToCart/${val}`).on('value', dt => {
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
    // console.log('list', list)
    useEffect(() => {
        getData()
    }, [])


    async function remove(e) {
        await database().ref(`addToCart/${login}/${e.id}`).remove()
        // console.log(e)
    }

    let add = (e) => {
        // console.log(e)
        let val = e.quantity
        setCount(val + 1)
        e.quantity = count
    }

    let subtract = (e) => {
        console.log('subtract', e)
    }

    let clearAll = async () => {
        await database().ref(`addToCart/{${login}/`).remove()
        setList([])
        // console.log()
    }


    let [currentDate, setCurrentDate] = useState()
    let [currentTime, setCurrentTime] = useState()

    let checkout = async () => {

        const date = new Date()
        setCurrentDate(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear())
        setCurrentTime(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
        setCheckoutLoader(true)

        // let key = database().ref(`orders/`).push().key
        // let key = database().ref(`orders/${login}`)
        await database().ref(`orders/${login}/`).set(list)
        // .try(async res => {
        await database().ref(`addToCart/${login}/`).remove()
        setList([])
        navigation.navigate('Confirm Order')
        ToastAndroid.show('Ordered Successfully', ToastAndroid.LONG)
        setCheckoutLoader(false)
        // })
        // .catch(err => {
        // console.log(err)
        // setCheckoutLoader(false)
        // })
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
                        <View style={{ marginTop: 10, paddingVertical: 5, height: '45%' }}>
                            <ScrollView>
                                {list.map((e, i) => (
                                    <View key={i} style={{ borderColor: 'grey', paddingVertical: 7, marginHorizontal: 15 }} >
                                        <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 10, backgroundColor: 'white', paddingVertical: 5, width: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '20%', alignItems: 'center' }}>
                                                <Image source={{ uri: e.src }} resizeMode='contain' style={{ height: 40, width: 50 }} />
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
                        <View style={{ width: '100%', backgroundColor:'white', borderLeftWidth: 1, borderRightWidth: 1, borderTopWidth: 3, borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingHorizontal: 20, position: 'absolute', bottom: 10 }}>
                            {/* <SMTextInput placeholder='Name' /> */}
                            {/* <SMTextInput value={model.name} placeholder='Name' style={[styles.input]} onChangeText={e => setModel({ ...model, name: e })} /> */}
                            <View style={{ marginBottom: 20, marginTop: 10 }}>
                                <SMTextInput placeholder='Name' style={[styles.input]} />
                                <SMTextInput placeholder='Address' style={[styles.input]} />
                                <SMTextInput placeholder='Contact' style={[styles.input]} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, }}>
                                <Text style={{ color: 'black' }}>Sub Total</Text>
                                <Text style={{ color: 'black' }}>150</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, }}>
                                <Text style={{ color: 'black' }}>Tax 13.00%</Text>
                                <Text style={{ color: 'black' }}>150</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, }}>
                                <Text style={{ color: 'black' }}>Delivery Fee</Text>
                                <Text style={{ color: 'black' }}>150</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Total</Text>
                                <Text style={{ color: 'black' }}>150</Text>
                            </View>
                            <SMTouchableOpacity onPress={checkout} value={checkoutLoader ? <ActivityIndicator size='large' color='white' /> : 'Checkout'}
                                touchableStyle={{ marginTop: 5, borderRadius: 5, backgroundColor: '#367E18', width: '100%', paddingVertical: 10 }}
                                textStyle={[style.colorWhite, { textAlign: 'center', fontWeight: 'bold', fontSize: 20 }]} />
                        </View>
                    </>
                    :
                    <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='shopping-bag' size={80} color='#DC3535' />
                        <Text style={{ fontSize: 32, color: '#DC3535' }}>Cart is Empty</Text>
                    </View>
                )
            }
        </>
    )
}

export default MyCart


const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderRadius: 8,
        paddingBottom: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    }
})