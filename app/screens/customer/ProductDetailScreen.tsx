import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Product } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card, Stars, Input, formatPrice } from '../ui/SharedComponents';

interface ProductDetailProps {
    product: Product;
    addToCart: (p: Product) => void;
    toggleWish: (p: Product) => void;
    wishlist: Product[];
    onBack: () => void;
    showToast: (msg: string) => void;
}

export const ProductDetailScreen = ({
    product: p, addToCart, toggleWish, wishlist, onBack, showToast,
}: ProductDetailProps) => {
    const [qty, setQty] = useState(1);
    const [review, setReview] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviews, setReviews] = useState([
        { user: 'Jane S.', rating: 5, text: 'Absolutely love this! Exceeded expectations.' },
        { user: 'Mike R.', rating: 4, text: 'Great quality, fast shipping. Highly recommend.' },
    ]);

    const inWish = wishlist.some(w => w.id === p.id);

    const submitReview = () => {
        if (!review.trim()) return;
        setReviews(r => [{ user: 'You', rating: reviewRating, text: review }, ...r]);
        setReview('');
        showToast('Review submitted!');
    };

    return (
        <ScrollView style={s.flex} contentContainerStyle={{ padding: 16, gap: 14 }}>
            <TouchableOpacity onPress={onBack}>
                <Text style={{ color: C.accent, fontSize: 15 }}>← Back to Shop</Text>
            </TouchableOpacity>

            {/* Image */}
            <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
                <Text style={{ fontSize: 90 }}>{p.emoji}</Text>
            </Card>

            {/* Info */}
            <View>
                <Text style={[s.muted, { color: C.accent }]}>{p.category}</Text>
                <Text style={s.detailTitle}>{p.name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 6 }}>
                    <Stars rating={p.rating} />
                    <Text style={s.muted}>{p.rating} ({p.reviews} reviews)</Text>
                </View>
                <Text style={[s.muted, { lineHeight: 22, marginBottom: 12 }]}>{p.description}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
                    <Text style={{ fontSize: 28, fontWeight: '900', color: C.accent }}>{formatPrice(p.price)}</Text>
                    {p.original > p.price && (
                        <Text style={[s.muted, { textDecorationLine: 'line-through' }]}>{formatPrice(p.original)}</Text>
                    )}
                </View>

                {/* Qty selector */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <View style={s.qtyRow}>
                        <TouchableOpacity onPress={() => qty > 1 && setQty(q => q - 1)} style={s.qtyBtn}>
                            <Text style={s.qtyBtnText}>−</Text>
                        </TouchableOpacity>
                        <Text style={s.qtyNum}>{qty}</Text>
                        <TouchableOpacity onPress={() => setQty(q => q + 1)} style={s.qtyBtn}>
                            <Text style={s.qtyBtnText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={s.muted}>{p.stock} in stock</Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Btn
                        label="Add to Cart 🛒"
                        onPress={() => { for (let i = 0; i < qty; i++) addToCart(p); }}
                        style={{ flex: 1 }}
                    />
                    <TouchableOpacity onPress={() => toggleWish(p)} style={s.wishLargeBtn}>
                        <Text style={{ fontSize: 22 }}>{inWish ? '❤️' : '🤍'}</Text>
                    </TouchableOpacity>
                </View>

                <Card style={[s.infoBanner, { marginTop: 12 }]}>
                    <Text style={[s.muted, { fontSize: 13 }]}>
                        ✅ Free shipping over $50  •  🔄 30-day returns  •  🛡️ 1-yr warranty
                    </Text>
                </Card>
            </View>

            {/* Reviews */}
            <Text style={s.sectionTitle}>Reviews</Text>
            <Card>
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                            <Text style={{ fontSize: 24, color: star <= reviewRating ? C.gold : C.textMuted }}>★</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Input
                    placeholder="Write your review…"
                    value={review}
                    onChangeText={setReview}
                    multiline
                    style={{ marginBottom: 10 }}
                />
                <Btn label="Submit Review" onPress={submitReview} variant="sm" />
            </Card>

            {reviews.map((r, i) => (
                <Card key={i}>
                    <Text style={{ fontWeight: '700', color: C.text, fontSize: 14, marginBottom: 4 }}>{r.user}</Text>
                    <Stars rating={r.rating} />
                    <Text style={[s.muted, { marginTop: 4 }]}>{r.text}</Text>
                </Card>
            ))}
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};