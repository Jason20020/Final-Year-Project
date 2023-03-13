import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AdHome from '../src/screens/Admin/Home'
import Car from '../src/screens/Admin/ViewCar'
import Comment from '../src/screens/Admin/ViewComment'
import User from '../src/screens/Admin/ViewUser'

const HomeStack = createDrawerNavigator();

export function HomeDrawerScreen () {
  return (
      <HomeStack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="Home" component={AdHome} />
        <HomeStack.Screen name="User" component={User} />
        <HomeStack.Screen name="Car" component={Car} />
        <HomeStack.Screen name="Comment" component={Comment} />
      </HomeStack.Navigator>
  );
}