import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import Orders from '../screens/Orders';
import AddItem from '../screens/AddItem';
import Splash from '../screens/Splash';
import Favourites from '../screens/Favourites';
import MyCart from '../screens/MyCart';
import ItemDetails from '../screens/ItemDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth'
import ConfirmOrder from '../screens/ConfirmOrder';
import SingleOrder from '../screens/SingleOrder';
import UserProfile from '../screens/UserProfile';
import AdminProfile from '../screens/AdminProfile';
import database from '@react-native-firebase/database'


function AppNavigation() {

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
        <Stack.Screen name='Single Order' component={SingleOrder} />
        <Stack.Screen name='Confirm Order' component={ConfirmOrder} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const Tab = createBottomTabNavigator();
function TabNavigator() {

    let [login, setLogin] = useState()
    let [loginId, setLoginId] = useState()
    let getData = async () => {
        const jsonValue = await AsyncStorage.getItem('LoginKey')
        const data = jsonValue !== null ? JSON.parse(jsonValue) : null
        setLogin(data.category)
        setLoginId(data.id)
    }

    useEffect(() => {
        getData()
    }, [])

    let type = login == "user";
    let val = loginId

    // console.log('login', login);
    // console.log('type', type);


    let [orderList, setOrderList] = useState()
    let ordersData = () => {
        database().ref('orders').on('value', dt => {
            if (dt.exists()) {
                let li = Object.values(dt.val())
                setOrderList(li)
            }
        })
    }
    let orderLength = orderList && setOrderList.length
    useEffect(() => {
        ordersData()
    }, [])


    let [cartList, setCartList] = useState()
    let [cartLength, setCartLength] = useState()
    async function cartData() {
        database().ref(`addToCart/${val}`).on('value', dt => {
            // console.log('79', dt)
            if (dt.exists()) {
                let li = Object.values(dt.val());
                console.log('li', dt.val());
                setCartList(li);
            }
            setCartLength(cartList.length);
        });
    }
    // let cartLength = cartList && cartList.length
    console.log('Line 98', cartList)
    console.log('Line 99', cartLength)



    
    useEffect(() => {
        cartData()
    },[cartList])
    

    return (
        <Tab.Navigator
            screenOptions={{ tabBarShowLabel: false, headerShown: false }}
        >
            {type ?
                <>
                    <Tab.Screen name="Home"
                        component={Home}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image style={{ width: 22, height: 22, tintColor: focused ? '#DC3535' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946488.png' }} />
                                    {/* <Text style={{ marginTop: 3, fontSize: 12, color: focused ? '#DC3535' : 'black' }}>Home</Text> */}
                                </>
                            )
                        }} />
                    <Tab.Screen name="Favourites"
                        component={Favourites}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image style={{ width: 22, height: 22, tintColor: focused ? '#DC3535' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/126/126471.png' }} />
                                    {/* <Text style={{ marginTop: 3, fontSize: 12, color: focused ? '#DC3535' : 'black' }}>Favourites</Text> */}
                                </>
                            )
                        }} />

                    <Tab.Screen name="MyCart"
                        component={MyCart}
                        options={{
                            tabBarBadge: cartLength,
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image style={{ width: 22, height: 22, tintColor: focused ? '#DC3535' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2832/2832495.png' }} />
                                    {/* <Text style={{ marginTop: 3, fontSize: 12, color: focused ? '#DC3535' : 'black' }}>My Cart</Text> */}
                                </>
                            )
                        }} />
                    <Tab.Screen name="UserProfile"
                        component={UserProfile}
                        options={{
                            // tabBarBadge: listItems,
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image style={{ width: 22, height: 22, tintColor: focused ? '#DC3535' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/456/456283.png' }} />
                                    {/* <Text style={{ marginTop: 3, fontSize: 12, color: focused ? '#DC3535' : 'black' }}>Profile</Text> */}
                                </>
                            )
                        }} />
                </>
                :
                <>
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
                    <Tab.Screen name="Orders"
                        component={Orders}
                        options={{
                            tabBarBadge: orderLength,
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7322/7322265.png' }} />
                                    {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>ORDERS</Text> */}
                                </>
                            )
                        }} />
                    <Tab.Screen name="AdminProfile"
                        component={AdminProfile}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <>
                                    <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/456/456283.png' }} />
                                    {/* <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>ORDERS</Text> */}
                                </>
                            )
                        }} />
                </>
            }
        </Tab.Navigator >
    )
}

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