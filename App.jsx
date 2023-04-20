import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import DetailsScreen from './src/views/screens/DetailsScreen';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={OnBoardScreen} name="OnBoarding" />
        <Stack.Screen component={HomeScreen} name="HomeScreen" />
        <Stack.Screen component={DetailsScreen} name="DetailsScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
