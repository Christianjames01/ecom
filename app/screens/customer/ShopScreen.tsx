import React from 'react';
import { View, Text, TextInput, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Product } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { ProductCard } from '../ui/ProductCard';

interface ShopScreenProps {
    products: Product[];
    categories: string[];
    category: string;
    setCategory: (c: string) => void;
    search: string;
    setSearch: (v: string) => void;
    addToCart: (p: Product) => void;
    toggleWish: (p: Product) => void;
    wishlist: Product[];
    onSelect: (p: Product) => void;
}

export const ShopScreen = ({
    products, categories, category, setCategory,
    search, setSearch, addToCart, toggleWish, wishlist, onSelect,
}: ShopScreenProps) => (
    <View style={s.flex}>
        <View style={{ padding: 16, gap: 12 }}>
            <View style={s.searchBar}>
                <Text style={{ fontSize: 18 }}>🔍</Text>
                <TextInput
                    style={s.searchInput}
                    placeholder="Search products…"
                    placeholderTextColor={C.textMuted}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    {categories.map(c => (
                        <TouchableOpacity
                            key={c}
                            onPress={() => setCategory(c)}
                            style={[s.filterChip, category === c && s.filterChipActive]}
                        >
                            <Text style={[{ fontSize: 13, fontWeight: '600' }, category === c ? { color: C.accent } : { color: C.textSub }]}>
                                {c}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>

        <FlatList
            data={products}
            keyExtractor={i => String(i.id)}
            numColumns={2}
            contentContainerStyle={{ padding: 10, gap: 12 }}
            columnWrapperStyle={{ gap: 12 }}
            renderItem={({ item }) => (
                <ProductCard
                    product={item}
                    onAdd={addToCart}
                    onSelect={onSelect}
                    wishlist={wishlist}
                    onToggleWish={toggleWish}
                />
            )}
            ListEmptyComponent={
                <View style={[s.center, { padding: 60 }]}>
                    <Text style={{ fontSize: 48 }}>🔍</Text>
                    <Text style={s.muted}>No products found</Text>
                </View>
            }
        />
    </View>
);