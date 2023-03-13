import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserHome from '../src/screens/User/Home'
import Favorite from '../src/screens/User/Favourite'
import Result from '../src/screens/User/Result'
import Profile from '../src/screens/User/Profile'
import EditProfile from '../src/screens/User/EditProfile'

const HomeStack = createStackNavigator();
export function HomeStackScreen () {
  return (
      <HomeStack.Navigator initialRouteName="UserHome" screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="UserHome" component={UserHome} />
        <HomeStack.Screen name="Favorite" component={Favorite} />
        <HomeStack.Screen name="Result" component={Result} />
        <HomeStack.Screen name="Profile" component={Profile} />
        <HomeStack.Screen name="EditProfile" component={EditProfile} />
      </HomeStack.Navigator>
  );
}