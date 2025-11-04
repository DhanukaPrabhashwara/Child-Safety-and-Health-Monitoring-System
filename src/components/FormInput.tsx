import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SPACING, SIZES } from '../constants/theme';

interface FormInputProps extends TextInputProps {
    label: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, style, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor={COLORS.textSecondary}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
    },
    label: {
        fontSize: SIZES.body,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontWeight: '500',
    },
    input: {
        backgroundColor: COLORS.surface,
        padding: SPACING.m,
        borderRadius: SIZES.radius,
        fontSize: 16,
        color: COLORS.text,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
});

export default FormInput;
