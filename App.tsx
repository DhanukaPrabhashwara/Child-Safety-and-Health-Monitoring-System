import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ChildProvider } from './src/context/ChildContext';
import HomeScreen from './src/screens/HomeScreen';
import AddChildScreen from './src/screens/AddChildScreen';
import ChildProfileScreen from './src/screens/ChildProfileScreen';
import ChildTabs from './src/navigation/ChildTabs';
import { RootStackParamList } from './src/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <ChildProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              cardStyle: { backgroundColor: '#F5F7FA' },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddChild" component={AddChildScreen} />
            <Stack.Screen name="ChildDashboard" component={ChildTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </ChildProvider>
    </SafeAreaProvider>
  );
}
