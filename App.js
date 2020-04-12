import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from './app/screens/Feed';
import ProfileScreen from './app/screens/Profile';
import UploadScreen from './app/screens/Upload';
import UserProfile from './app/screens/UserProfile';
import Comment from './app/screens/Comment';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>  
  );
}

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal" headerMode="none">
      <Stack.Screen name="Home" component={TabStack} />
      <Stack.Screen name="User" component={UserProfile} />
      <Stack.Screen name="Comment" component={Comment} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
