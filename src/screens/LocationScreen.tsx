import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ChildTabParamList } from '../navigation/types';
import { COLORS, SPACING, SIZES } from '../constants/theme';

type LocationScreenRouteProp = RouteProp<ChildTabParamList, 'Location'>;

const LocationScreen = () => {
    const route = useRoute<LocationScreenRouteProp>();
    const { child } = route.params;
    const { location, locationHistory, safeZones } = child;

    const isSafe = safeZones.includes(location.status === 'Arrived' ? location.address.split(',')[0] : '');
    // Simplified safe zone logic for demo

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <LinearGradient
                colors={['#0E639C', '#1E1E1E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.header}
            >
                <Text style={styles.title}>Location Tracking</Text>
                <Text style={styles.subtitle}>Real-time Monitor</Text>
            </LinearGradient>

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
                <View style={styles.mapBackground}>
                    {/* Grid Pattern Simulation */}
                    <View style={styles.gridLineVertical} />
                    <View style={styles.gridLineHorizontal} />

                    {/* Fake Locations */}
                    <View style={[styles.mapPin, { top: '30%', left: '40%' }]}>
                        <MaterialIcons name="school" size={24} color={COLORS.primary} />
                        <Text style={styles.mapLabel}>School</Text>
                    </View>

                    <View style={[styles.mapPin, { top: '60%', left: '70%' }]}>
                        <Ionicons name="home" size={24} color={COLORS.success} />
                        <Text style={styles.mapLabel}>Home</Text>
                    </View>

                    {/* Current Child Location */}
                    <View style={[styles.mapPin, { top: '45%', left: '50%' }]}>
                        <View style={styles.pulseContainer}>
                            <View style={styles.pulseRing} />
                            <Image
                                source={{ uri: child.photoUrl }}
                                style={styles.mapAvatar}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.mapOverlay}>
                    <Text style={styles.mapOverlayText}>Live Tracking Active</Text>
                </View>
            </View>

            {/* Status Card */}
            <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: isSafe ? COLORS.success : COLORS.warning }]}>
                <View style={styles.row}>
                    <Ionicons
                        name={isSafe ? "shield-checkmark" : "warning"}
                        size={32}
                        color={isSafe ? COLORS.success : COLORS.warning}
                    />
                    <View style={{ marginLeft: SPACING.m }}>
                        <Text style={styles.cardTitle}>Status: {location.status || 'Unknown'}</Text>
                        <Text style={styles.cardSubtitle}>
                            {location.address}
                        </Text>
                    </View>
                </View>
            </View>

            {/* History List */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Movement History</Text>
                {locationHistory.map((loc, index) => (
                    <View key={index} style={styles.historyItem}>
                        <View style={styles.timelineContainer}>
                            <View style={styles.timelineDot} />
                            {index !== locationHistory.length - 1 && <View style={styles.timelineLine} />}
                        </View>
                        <View style={styles.historyContent}>
                            <Text style={styles.historyTime}>{loc.timestamp}</Text>
                            <Text style={styles.historyStatus}>{loc.status} - {loc.address}</Text>
                        </View>
                    </View>
                ))}
                {locationHistory.length === 0 && (
                    <Text style={styles.emptyText}>No recent movements recorded.</Text>
                )}
            </View>
        </ScrollView>
    );
};

// Start of Mock Image component since I didn't import Image
import { Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        padding: SPACING.m,
        paddingBottom: 50,
    },
    header: {
        marginBottom: SPACING.m,
        padding: SPACING.m,
    },
    title: {
        fontSize: SIZES.title,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: SIZES.body,
        color: COLORS.textSecondary,
    },
    mapContainer: {
        height: 250,
        backgroundColor: '#1A2F3A',
        borderRadius: SIZES.radius,
        marginBottom: SPACING.m,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    mapBackground: {
        flex: 1,
        position: 'relative',
    },
    gridLineVertical: {
        position: 'absolute',
        left: '50%',
        height: '100%',
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    gridLineHorizontal: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    mapPin: {
        position: 'absolute',
        alignItems: 'center',
    },
    mapLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    mapAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    pulseContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulseRing: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 122, 204, 0.3)',
    },
    mapOverlay: {
        position: 'absolute',
        top: SPACING.s,
        left: SPACING.s,
        backgroundColor: 'rgba(37,37,38,0.95)',
        paddingHorizontal: SPACING.s,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    mapOverlayText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    card: {
        backgroundColor: COLORS.cardBg,
        borderRadius: SIZES.radius,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        elevation: 3,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    cardSubtitle: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    section: {
        marginTop: SPACING.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    historyItem: {
        flexDirection: 'row',
        marginBottom: SPACING.m,
    },
    timelineContainer: {
        alignItems: 'center',
        marginRight: SPACING.m,
        width: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
    },
    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: COLORS.primary,
        opacity: 0.3,
        marginTop: 4,
    },
    historyContent: {
        flex: 1,
        paddingBottom: SPACING.s,
    },
    historyTime: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },
    historyStatus: {
        fontSize: 16,
        color: COLORS.text,
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: SPACING.m,
    },
});

export default LocationScreen;
