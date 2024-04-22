import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './src/pages/components/landingPage';
import GameBoard from './src/pages/components/gameBoard';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={LandingPage}  options={{ headerShown: false }} />
        <Stack.Screen name="GameBoard" component={GameBoard}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
