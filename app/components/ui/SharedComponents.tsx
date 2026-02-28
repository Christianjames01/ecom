import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ViewStyle, TextStyle } from 'react-native';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';

// ─── BTN ─────────────────────────────────────────────────────────────────────
interface BtnProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'ghost' | 'danger' | 'sm';
    icon?: string;
    style?: ViewStyle;
    disabled?: boolean;
}
export const Btn = ({ label, onPress, variant = 'primary', icon, style: sx, disabled }: BtnProps) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        disabled={disabled}
        style={[
            s.btn,
            variant === 'primary' && s.btnPrimary,
            variant === 'ghost' && s.btnGhost,
            variant === 'danger' && s.btnDanger,
            variant === 'sm' && s.btnSm,
            disabled && { opacity: 0.5 },
            sx,
        ]}
    >
        {icon ? <Text style={{ fontSize: 15 }}>{icon}</Text> : null}
        <Text style={[s.btnText, variant === 'ghost' && { color: C.textSub }, variant === 'danger' && { color: '#fff' }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

// ─── INPUT ────────────────────────────────────────────────────────────────────
interface InputProps {
    placeholder: string;
    value: string;
    onChangeText: (v: string) => void;
    secureTextEntry?: boolean;
    multiline?: boolean;
    keyboardType?: any;
    style?: ViewStyle;
    editable?: boolean;
}
export const Input = ({ placeholder, value, onChangeText, secureTextEntry, multiline, keyboardType, style: sx, editable = true }: InputProps) => (
    <TextInput
        style={[s.input, multiline && { minHeight: 80, textAlignVertical: 'top' }, sx]}
        placeholder={placeholder}
        placeholderTextColor={C.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        keyboardType={keyboardType}
        editable={editable}
    />
);

// ─── CARD ─────────────────────────────────────────────────────────────────────
interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}
export const Card = ({ children, style: sx }: CardProps) => (
    <View style={[s.card, sx]}>{children}</View>
);

// ─── TAG ──────────────────────────────────────────────────────────────────────
interface TagProps {
    text: string;
    color: string;
}
export const Tag = ({ text, color }: TagProps) => (
    <View style={[s.tag, { backgroundColor: color + '22' }]}>
        <Text style={[s.tagText, { color }]}>{text}</Text>
    </View>
);

// ─── STARS ────────────────────────────────────────────────────────────────────
export const Stars = ({ rating }: { rating: number }) => (
    <Text style={{ color: C.gold, fontSize: 13 }}>
        {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </Text>
);

// ─── TOAST ────────────────────────────────────────────────────────────────────
export const Toast = ({ msg }: { msg: string }) => (
    <View style={s.toast} pointerEvents="none">
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>{msg}</Text>
    </View>
);

// ─── AVATAR ───────────────────────────────────────────────────────────────────
interface AvatarProps {
    letter: string;
    size?: number;
    color?: string;
    bgColor?: string;
}
export const Avatar = ({ letter, size = 36, color = C.accent, bgColor = C.accentLight }: AvatarProps) => (
    <View style={[s.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
        <Text style={[s.avatarText, { fontSize: size * 0.38, color }]}>{letter}</Text>
    </View>
);

// ─── PRICE ────────────────────────────────────────────────────────────────────
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;