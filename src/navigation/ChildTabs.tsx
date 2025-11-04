import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';

import { ChildTabParamList, RootStackParamList } from './types';
import ChildProfileScreen from '../screens/ChildProfileScreen';
import HealthDataScreen from '../screens/HealthDataScreen';
import HydrationScreen from '../screens/HydrationScreen';
import HeartRateScreen from '../screens/HeartRateScreen';
import LocationScreen from '../screens/LocationScreen';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator<ChildTabParamList>();

type ChildDashboardRouteProp = RouteProp<RootStackParamList, 'ChildDashboard'>;

const ChildTabs = () => {
    const route = useRoute<ChildDashboardRouteProp>();
    const { child } = route.params;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#00D9FF',
                tabBarInactiveTintColor: COLORS.textSecondary,
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 2,
                    paddingTop: 8,
                    backgroundColor: 'rgba(30, 30, 30, 0.95)',
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dashboard') {
                        return <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />;
                    } else if (route.name === 'Health') {
                        return <MaterialCommunityIcons name={focused ? "hospital-box" : "hospital-box-outline"} size={size} color={color} />;
                    } else if (route.name === 'Hydration') {
                        return <Ionicons name={focused ? "water" : "water-outline"} size={size} color={color} />;
                    } else if (route.name === 'Heart') {
                        return <FontAwesome5 name="heartbeat" size={24} color={color} />;
                    } else if (route.name === 'Location') {
                        return <Ionicons name={focused ? "location" : "location-outline"} size={size} color={color} />;
                    }
                },
            })}
        >
            <Tab.Screen
                name="Dashboard"
                component={ChildProfileScreen}
                initialParams={{ child }}
            />
            <Tab.Screen
                name="Health"
                component={HealthDataScreen}
                initialParams={{ child }}
            />
            <Tab.Screen
                name="Hydration"
                component={HydrationScreen}
                initialParams={{ child }}
            />
            <Tab.Screen
                name="Heart"
                component={HeartRateScreen}
                initialParams={{ child }}
            />
            <Tab.Screen
                name="Location"
                component={LocationScreen}
                initialParams={{ child }}
            />
        </Tab.Navigator>
    );
};

export default ChildTabs;
