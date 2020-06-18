import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FeedScreen from './app/screens/Feed';
import ProfileScreen from './app/screens/Profile';
import UploadScreen from './app/screens/Upload';
import UserProfile from './app/screens/UserProfile';
import Comment from './app/screens/Comment';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = focused
                ? 'md-image'
                : 'md-image';
            } else if (route.name === 'Upload') {
              iconName = focused ? 'md-cloud-upload' : 'md-cloud-upload';
            }  else if (route.name === 'Profile') {
              iconName = focused ? 'md-person' : 'md-person';
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
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
