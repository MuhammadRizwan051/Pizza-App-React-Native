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


let category;
function AppNavigation() {
    let [userData, setUserData] = useState()
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('SignupUser')
            setUserData(JSON.parse(jsonValue))
            console.log('Home', JSON.parse(jsonValue))
        } catch (e) {
            console.log(e)
        }
    }
    category = userData && userData.user.email
    useEffect(() => {
        getData()
    }, [])
    console.log('user---->',category)

    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )

}

const Stack = createNativeStackNavigator()
const StackNavigator = () => (
    <Stack.Navigator>
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
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }} />
                        <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>HOME</Text>
                    </>
                )
            }} />
        <Tab.Screen name="Orders"
            component={Orders}
            options={{
                tabBarBadge: 2,
                tabBarIcon: ({ focused }) => (
                    <>
                        <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7322/7322265.png' }} />
                        <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>ORDERS</Text>
                    </>
                )
            }} />
        {category === 'user@gmail.com' &&
            <Tab.Screen name="Add"
                component={AddItem}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <Image style={{ width: 22, height: 22, tintColor: focused ? 'white' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1237/1237946.png' }} />
                            <Text style={{ marginTop: 1, fontSize: 12, color: focused ? 'white' : 'black' }}>ADD</Text>
                        </>
                    )
                }} />
        }
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