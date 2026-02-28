import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { PRODUCTS } from '../../constants/data';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card } from '../ui/SharedComponents';
import { ProductCard } from '../ui/ProductCard';
import { Product } from '../../types';

interface HomeScreenProps {
    setPage: (p: string) => void;
    addToCart: (p: Product) => void;
}

export const HomeScreen = ({ setPage, addToCart }: HomeScreenProps) => (
    <ScrollView style={s.flex} contentContainerStyle={{ padding: 16, gap: 16 }} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={s.hero}>
            <Text style={s.heroSub}>New Season Collection</Text>
            <Text style={s.heroTitle}>
                Shop the Future,{'\n'}<Text style={{ color: C.accent }}>Today.</Text>
            </Text>
            <Text style={[s.muted, { lineHeight: 22, marginBottom: 12 }]}>
                Premium products curated for the modern lifestyle. Free shipping over $50.
            </Text>
            <Btn label="Explore Shop →" onPress={() => setPage('shop')} style={{ alignSelf: 'flex-start' }} />
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
            {[['10K+', 'Products'], ['50K+', 'Customers'], ['4.9★', 'Rating']].map(([v, l]) => (
                <Card key={l} style={{ flex: 1, alignItems: 'center', paddingVertical: 14 }}>
                    <Text style={{ fontSize: 18, fontWeight: '800', color: C.accent }}>{v}</Text>
                    <Text style={s.muted}>{l}</Text>
                </Card>
            ))}
        </View>

        {/* Featured */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={s.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => setPage('shop')}>
                <Text style={{ color: C.accent, fontSize: 13 }}>View All →</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {PRODUCTS.slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} onSelect={() => { }} />
            ))}
        </View>

        {/* Categories */}
        <Text style={s.sectionTitle}>Browse Categories</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {[['Electronics', '⚡'], ['Fashion', '👗'], ['Home', '🏠'], ['Kitchen', '🍳'], ['Outdoors', '🏕️']].map(([cat, ic]) => (
                <TouchableOpacity key={cat} style={s.catChip} onPress={() => setPage('shop')}>
                    <Text style={{ fontSize: 22 }}>{ic}</Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: C.text, marginTop: 4 }}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <View style={{ height: 20 }} />
    </ScrollView>
);