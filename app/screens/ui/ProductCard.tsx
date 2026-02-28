import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Platform, Dimensions } from 'react-native';
import { Product } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Stars, Tag, formatPrice } from './SharedComponents';

const { width: SW } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';

interface ProductCardProps {
    product: Product;
    onAdd: (p: Product) => void;
    onSelect: (p: Product) => void;
    wishlist?: Product[];
    onToggleWish?: (p: Product) => void;
}

export const ProductCard = ({ product: p, onAdd, onSelect, wishlist = [], onToggleWish }: ProductCardProps) => {
    const cardW = isWeb ? 220 : (SW - 44) / 2;
    const inWish = wishlist.some(w => w.id === p.id);

    const badgeColor = p.badge === 'Sale' ? C.red : p.badge === 'New' ? C.green : C.gold;

    return (
        <TouchableOpacity style={[s.productCard, { width: cardW }]} onPress={() => onSelect(p)} activeOpacity={0.9}>
            <View style={s.productImgBox}>
                {p.badge && <Tag text={p.badge} color={badgeColor} />}
                {onToggleWish && (
                    <TouchableOpacity onPress={() => onToggleWish(p)} style={s.wishBtn}>
                        <Text style={{ fontSize: 18 }}>{inWish ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                )}
                <Text style={{ fontSize: 56 }}>{p.emoji}</Text>
            </View>
            <View style={{ padding: 12 }}>
                <Text style={s.muted}>{p.category}</Text>
                <Text style={s.productName} numberOfLines={2}>{p.name}</Text>
                <Stars rating={p.rating} />
                <Text style={s.muted}>({p.reviews})</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <View>
                        <Text style={s.price}>{formatPrice(p.price)}</Text>
                        {p.original > p.price && (
                            <Text style={[s.muted, { textDecorationLine: 'line-through', fontSize: 11 }]}>{formatPrice(p.original)}</Text>
                        )}
                    </View>
                    <TouchableOpacity style={s.addBtn} onPress={() => onAdd(p)} activeOpacity={0.8}>
                        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};