import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import Orders from '../screens/Orders';
import { NavigationContainer } from '@react-navigation/native';
import { Image, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddItem from '../screens/AddItem';
import ItemDetails from '../screens/ItemDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Splash from '../screens/Splash';
import Favourites from '../screens/Favourites';
import MyCart from '../screens/MyCart';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'


// let category;
let obj;
let getCategory
let listItems;

function AppNavigation() {

    let checkUser = () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                // const uid = user.uid
                // resolve(uid)
                let getData = async () => {
                    try {
                        const jsonValue = await AsyncStorage.getItem('LoginKey')
                        const data = jsonValue !== null ? JSON.parse(jsonValue) : null
                        if (data) {
                            obj = jsonValue
                            console.log('Data Receive', obj)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                getData()
                console.log('Check User', user.email)
                // console.log('Check User', user.email)
            }
            else {
                // User is signed out
                console.log("No user is Login ..")
            }
        })
    }

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )
}

const Stack = createNativeStackNavigator()
const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Signup' component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name='Item Details' component={ItemDetails} />
        <Stack.Screen name='HomeScreen' component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{ tabBarShowLabel: false, headerShown: false, tabBarActiveBackgroundColor: '#DC3535' }}
    >
        <Tab.Screen name="Home"
            component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }} />
                        {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>HOME</Text> */}
                    </>
                )
            }} />
        <Tab.Screen name="Favourites"
            component={Favourites}
            options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/126/126471.png' }} />
                        {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>Favourites</Text> */}
                    </>
                )
            }} />
        <Tab.Screen name="MyCart"
            component={MyCart}
            options={{
                // tabBarBadge: listItems,
                tabBarIcon: ({ focused }) => (
                    <>
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2832/2832495.png' }} />
                        {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>My Cart</Text> */}
                    </>
                )
            }} />
        <Tab.Screen name="Orders"
            component={Orders}
            options={{
                tabBarBadge: 1,
                tabBarIcon: ({ focused }) => (
                    <>
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7322/7322265.png' }} />
                        {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>ORDERS</Text> */}
                    </>
                )
            }} />
        <Tab.Screen name="Add"
            component={AddItem}
            options={{
                tabBarIcon: ({ focused }) => (
                    <>
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992651.png' }} />
                        {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>ADD</Text> */}
                    </>
                )
            }} />

    </Tab.Navigator>
)

export default AppNavigation





// Material Bottom Navigation

// const Tab = createMaterialBottomTabNavigator();
// const TabNavigator = () => (
//     <Tab.Navigator
//         initialRouteName="Home"
//         activeColor="red"
//         inactiveColor="#ebaabd"
//         barStyle={{ backgroundColor: '#694fad', padding: 0 }}
//         shifting={true}
//         screenOptions={{ tabBarShowLabel: false, headerShown: false }}
//     // tabBarBadge={true}
//     // labeled={false}
//     // sceneAnimationEnabled={false}
//     >
//         <Tab.Screen name="Home"
//             component={Home}
//             options={{
//                 tabBarLabel: 'HOME',
//                 tabBarColor: '#ebaabd',
//                 tabBarIcon: ({ focused }) => (
//                     <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }} />
//                 )
//             }} />
//         <Tab.Screen name="Orders"
//             component={Orders}
//             options={{
//                 tabBarLabel: 'ORDERS',
//                 tabBarColor: '#ebaabd',
//                 tabBarIcon: ({ focused }) => (
//                     <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7322/7322265.png' }} />
//                 )
//             }} />
//         <Tab.Screen name="Add"
//             component={AddItem}
//             options={{
//                 tabBarLabel: 'ADD',
//                 tabBarColor: '#ebaabd',
//                 tabBarIcon: ({ focused }) => (
//                     <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1237/1237946.png' }} />
//                 )
//             }} />
//     </Tab.Navigator>
// )