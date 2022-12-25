// import 'react-native-gesture-handler';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Orders from '../screens/Orders';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddItem from '../screens/AddItem';

// const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator()
const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='HomeScreen' component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="red"
        inactiveColor="#ebaabd"
        barStyle={{ backgroundColor: '#694fad', padding: 0 }}
        shifting={true}
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    // tabBarBadge={true}
    // labeled={false}
    // sceneAnimationEnabled={false}
    >
        <Tab.Screen name="Home"
            component={Home}
            options={{
                tabBarLabel: 'HOME',
                tabBarColor: '#ebaabd',
                tabBarIcon: ({ focused }) => (
                    <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }} />
                )
            }} />
        <Tab.Screen name="Orders"
            component={Orders}
            options={{
                tabBarLabel: 'ORDERS',
                tabBarColor: '#ebaabd',
                tabBarIcon: ({ focused }) => (
                    <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7322/7322265.png' }} />
                )
            }} />
        <Tab.Screen name="Add"
            component={AddItem}
            options={{
                tabBarLabel: 'ADD',
                tabBarColor: '#ebaabd',
                tabBarIcon: ({ focused }) => (
                    <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1237/1237946.png' }} />
                )
            }} />
    </Tab.Navigator>
)

function AppNavigation() {
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    )

}

export default AppNavigation