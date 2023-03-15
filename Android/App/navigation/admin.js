import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdHome from '../src/screens/Admin/Home'
import Car from '../src/screens/Admin/ViewCar'
import Comment from '../src/screens/Admin/ViewComment'
import User from '../src/screens/Admin/ViewUser'
import UserProfile from '../src/screens/Admin/User'
import EditProfile from '../src/screens/Admin/EditProfile'

const HomeStack = createDrawerNavigator();

export function HomeDrawerScreen () {
  return (
      <HomeStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={AdHome} />
        <HomeStack.Screen name="User" component={UserNavigator} />
        <HomeStack.Screen name="Car" component={Car} />
        <HomeStack.Screen name="Comment" component={Comment} />
      </HomeStack.Navigator>
  );
}

const UserStack = createStackNavigator();

export function UserNavigator() {
  return (
      <UserStack.Navigator initialRouteName="ViewUser" screenOptions={{headerShown: false}}>
        <UserStack.Screen name="ViewUser" component={User} />
        <UserStack.Screen name="UserProfile" component={UserProfile} />
        <UserStack.Screen name="EditProfile" component={EditProfile} />
      </UserStack.Navigator>
  );
}