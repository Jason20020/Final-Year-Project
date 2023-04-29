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
import CommentDetail from '../src/screens/Admin/Comment'

const AdminStack = createDrawerNavigator();

export function HomeDrawerScreen () {
  return (
      <AdminStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <AdminStack.Screen name="Home" component={HomeNavigator} />
        <AdminStack.Screen name="User" component={UserNavigator} />
        <AdminStack.Screen name="Car" component={CarNavigator} />
        <AdminStack.Screen name="Comment" component={CommentNavigator} />
      </AdminStack.Navigator>
  );
}

const HomeStack = createStackNavigator();

export function HomeNavigator() {
  return (
      <HomeStack.Navigator initialRouteName="AdminHome" screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="AdminHome" component={AdHome} />
        <HomeStack.Screen name="CarDetail" component={CarDetail} />
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
        <CarStack.Screen name="CommentDetail" component={CommentDetail} />
      </CarStack.Navigator>
  );
}

const CommentStack = createStackNavigator();

export function CommentNavigator() {
  return (
      <CommentStack.Navigator initialRouteName="ViewComment" screenOptions={{headerShown: false}}>
        <CommentStack.Screen name="ViewComment" component={Comment} />
        <CommentStack.Screen name="CommentDetail" component={CommentDetail} />
      </CommentStack.Navigator>
  );
}