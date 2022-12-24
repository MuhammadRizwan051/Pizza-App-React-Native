// import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Login from '../screens/Login';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Login" component={Login} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation