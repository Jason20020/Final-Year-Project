import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GeneralNavigator } from './navigation/generalNav';

function App() {
  return (
    <NavigationContainer>
      <GeneralNavigator/>
    </NavigationContainer>
  );
}
export default App;