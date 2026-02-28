import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { CartItem, Order, Product } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card, Tag, formatPrice } from '../ui/SharedComponents';
import { ProductCard } from '../ui/ProductCard';
import { STATUS_COLORS } from '../../constants/theme';
import { AuthUser } from '../../types';

// ─── CART ─────────────────────────────────────────────────────────────────────
interface CartScreenProps {
    cart: CartItem[];
    setCart: (c: CartItem[]) => void;
    total: number;
    setPage: (p: string) => void;
}

export const CartScreen = ({ cart, setCart, total, setPage }: CartScreenProps) => {
    const remove = (id: number) => setCart(cart.filter(i => i.id !== id));
    const update = (id: number, qty: number) => {
        if (qty === 0) { remove(id); return; }
        setCart(cart.map(i => i.id === id ? { ...i, qty } : i));
    };

    if (!cart.length) {
        return (
            <View style={[s.flex, s.center]}>
                <Text style={{ fontSize: 64, marginBottom: 12 }}>🛒</Text>
                <Text style={s.sectionTitle}>Your cart is empty</Text>
                <Btn label="Shop Now →" onPress={() => setPage('shop')} style={{ marginTop: 16 }} />
            </View>
        );
    }

    return (
        <View style={s.flex}>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
                {cart.map(item => (
                    <Card key={item.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '700', color: C.text, fontSize: 14 }} numberOfLines={1}>{item.name}</Text>
                            <Text style={{ color: C.accent, fontWeight: '700' }}>{formatPrice(item.price)}</Text>
                        </View>
                        <View style={s.qtyRow}>
                            <TouchableOpacity onPress={() => update(item.id, item.qty - 1)} style={s.qtyBtn}>
                                <Text style={s.qtyBtnText}>−</Text>
                            </TouchableOpacity>
                            <Text style={s.qtyNum}>{item.qty}</Text>
                            <TouchableOpacity onPress={() => update(item.id, item.qty + 1)} style={s.qtyBtn}>
                                <Text style={s.qtyBtnText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontWeight: '700', color: C.text }}>{formatPrice(item.price * item.qty)}</Text>
                        <TouchableOpacity onPress={() => remove(item.id)}>
                            <Text style={{ fontSize: 20 }}>🗑️</Text>
                        </TouchableOpacity>
                    </Card>
                ))}
            </ScrollView>

            <View style={s.cartFooter}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>Total</Text>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: C.accent }}>{formatPrice(total)}</Text>
                </View>
                <Btn label="Proceed to Checkout →" onPress={() => setPage('checkout')} style={{ width: '100%' }} />
            </View>
        </View>
    );
};

// ─── WISHLIST ─────────────────────────────────────────────────────────────────
interface WishlistScreenProps {
    wishlist: Product[];
    addToCart: (p: Product) => void;
    toggleWish: (p: Product) => void;
}

export const WishlistScreen = ({ wishlist, addToCart, toggleWish }: WishlistScreenProps) => (
    <View style={s.flex}>
        <Text style={[s.sectionTitle, { padding: 16 }]}>Wishlist ({wishlist.length})</Text>
        {!wishlist.length ? (
            <View style={[s.flex, s.center]}>
                <Text style={{ fontSize: 56 }}>🤍</Text>
                <Text style={s.muted}>Your wishlist is empty</Text>
            </View>
        ) : (
            <FlatList
                data={wishlist}
                keyExtractor={i => String(i.id)}
                numColumns={2}
                contentContainerStyle={{ padding: 10, gap: 12 }}
                columnWrapperStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        onAdd={() => addToCart(item)}
                        onSelect={() => { }}
                        wishlist={wishlist}
                        onToggleWish={() => toggleWish(item)}
                    />
                )}
            />
        )}
    </View>
);

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const OrdersScreen = ({ orders }: { orders: Order[] }) => (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={s.sectionTitle}>My Orders</Text>
        {!orders.length ? (
            <View style={[s.center, { padding: 60 }]}>
                <Text style={{ fontSize: 56 }}>📦</Text>
                <Text style={s.muted}>No orders yet</Text>
            </View>
        ) : orders.map(o => (
            <Card key={o.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <View>
                    <Text style={{ fontWeight: '700', color: C.text }}>{o.id}</Text>
                    <Text style={s.muted}>{o.date} · {o.items} items</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: C.accent, fontWeight: '700', marginBottom: 4 }}>{formatPrice(o.total)}</Text>
                    <Tag text={o.status} color={STATUS_COLORS[o.status] || C.textMuted} />
                </View>
            </Card>
        ))}
    </ScrollView>
);

// ─── PROFILE ──────────────────────────────────────────────────────────────────
interface ProfileScreenProps {
    user: AuthUser;
    onLogout: () => void;
}

export const ProfileScreen = ({ user, onLogout }: ProfileScreenProps) => (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
            <View style={[s.avatar, { width: 64, height: 64, marginBottom: 10 }]}>
                <Text style={[s.avatarText, { fontSize: 24 }]}>{user.name[0]}</Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '800', color: C.text }}>{user.name}</Text>
            <Text style={s.muted}>{user.email}</Text>
        </Card>

        <Card>
            <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Edit Profile</Text>
            <View style={{ gap: 10 }}>
                {['Full Name', 'Email', 'Phone Number', 'Address'].map(ph => (
                    <View key={ph} style={[s.input, { justifyContent: 'center' }]}>
                        <Text style={{ color: C.textMuted }}>{ph}</Text>
                    </View>
                ))}
                <Btn label="Save Changes" onPress={() => { }} style={{ width: '100%' }} />
            </View>
        </Card>

        <Btn label="Sign Out" onPress={onLogout} variant="danger" style={{ width: '100%' }} />
        <View style={{ height: 20 }} />
    </ScrollView>
);