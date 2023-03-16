import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdHome from '../src/screens/Admin/Home'
import Car from '../src/screens/Admin/ViewCar'
import Comment from '../src/screens/Admin/ViewComment'
import User from '../src/screens/Admin/ViewUser'
import UserProfile from '../src/screens/Admin/User'
import EditProfile from '../src/screens/Admin/EditProfile'
import CarDetail from '../src/screens/Admin/Car'
import EditCar from '../src/screens/Admin/EditCar';

const HomeStack = createDrawerNavigator();

export function HomeDrawerScreen () {
  return (
      <HomeStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={AdHome} />
        <HomeStack.Screen name="User" component={UserNavigator} />
        <HomeStack.Screen name="Car" component={CarNavigator} />
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

const CarStack = createStackNavigator();

export function CarNavigator() {
  return (
      <CarStack.Navigator initialRouteName="ViewCar" screenOptions={{headerShown: false}}>
        <CarStack.Screen name="ViewCar" component={Car} />
        <CarStack.Screen name="CarDetail" component={CarDetail} />
        <CarStack.Screen name="EditCar" component={EditCar} />
      </CarStack.Navigator>
  );
}