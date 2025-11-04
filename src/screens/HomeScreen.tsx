import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { useChildContext } from '../context/ChildContext';
import ChildCard from '../components/ChildCard';
import { COLORS, SPACING, SIZES } from '../constants/theme';
import { RootStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { children } = useChildContext();

    const handleAddChild = () => {
        navigation.navigate('AddChild');
    };

    const handleChildPress = (child: any) => {
        navigation.navigate('ChildDashboard', { child });
    };

    const alerts = children.reduce((acc: string[], child) => {
        if (child.healthData.hydrationLevel < 40) acc.push(`${child.name} is dehydrated.`);
        if (child.healthData.stressLevel > 70) acc.push(`${child.name} has high stress levels.`);
        if (child.location.status === 'Unknown') acc.push(`Unable to locate ${child.name}.`);
        return acc;
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <LinearGradient
                colors={['#0E639C', '#1E1E1E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Children</Text>
                <Text style={styles.headerSubtitle}>Monitor their safety & health</Text>
            </LinearGradient>

            {alerts.length > 0 && (
                <View style={styles.alertContainer}>
                    <View style={styles.alertHeader}>
                        <Ionicons name="notifications" size={20} color={COLORS.white} />
                        <Text style={styles.alertHeaderText}>Attention Needed ({alerts.length})</Text>
                    </View>
                    {alerts.map((alert, index) => (
                        <Text key={index} style={styles.alertText}>• {alert}</Text>
                    ))}
                </View>
            )}

            <FlatList
                data={children}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChildCard child={item} onPress={() => handleChildPress(item)} />
                )}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No children added yet.</Text>
                        <Text style={styles.emptySubtext}>Tap the + button to add one.</Text>
                    </View>
                }
            />

            <TouchableOpacity style={styles.fab} onPress={handleAddChild} activeOpacity={0.8}>
                <LinearGradient
                    colors={['#007ACC', '#005fa3']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.fabGradient}
                >
                    <Ionicons name="add" size={30} color={COLORS.white} />
                </LinearGradient>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        padding: SPACING.m,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    headerSubtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    listContent: {
        padding: SPACING.m,
        paddingBottom: 100, // Space for FAB
    },
    fab: {
        position: 'absolute',
        bottom: SPACING.xl,
        right: SPACING.xl,
        width: 56,
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    fabGradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: SIZES.subtitle,
        color: COLORS.text,
        fontWeight: '600',
    },
    emptySubtext: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
        marginTop: 8,
    },
    alertContainer: {
        backgroundColor: '#3D2626',
        margin: SPACING.m,
        marginBottom: 0,
        borderRadius: SIZES.radius,
        padding: SPACING.m,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.danger,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: COLORS.danger,
        padding: 6,
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    alertHeaderText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 6,
        fontSize: 12,
    },
    alertText: {
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 4,
        marginLeft: 8,
    },
});

export default HomeScreen;
