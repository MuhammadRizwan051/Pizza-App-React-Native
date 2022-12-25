// import 'react-native-gesture-handler';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

// const Drawer = createDrawerNavigator();

const Tab = createMaterialBottomTabNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="red"
                inactiveColor="#ebaabd"
                barStyle={{ backgroundColor: '#694fad' }}
                shifting={true}
                // tabBarBadge={true}
                // labeled={false}
                screenOptions={{ tabBarShowLabel: false, headerShown: false }}
            // sceneAnimationEnabled={false}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: 'HOME',
                        tabBarColor: '#ebaabd',
                        tabBarIcon: ({ focused }) => (
                            <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }} />
                        )
                    }} />
                <Tab.Screen
                    name="Login"
                    component={Login}
                    options={{
                        tabBarLabel: 'LOGIN',
                        tabBarColor: 'red',
                        tabBarIcon: ({ focused }) => (
                            <Image style={{ width: 22, height: 22, tintColor: focused ? 'royalblue' : 'black' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }} />
                        )

                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation