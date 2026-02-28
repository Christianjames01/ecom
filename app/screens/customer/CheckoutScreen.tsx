import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { CartItem } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card, Input, formatPrice } from '../ui/SharedComponents';

interface CheckoutScreenProps {
    cart: CartItem[];
    total: number;
    onComplete: () => void;
    onBack: () => void;
}

export const CheckoutScreen = ({ cart, total, onComplete, onBack }: CheckoutScreenProps) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', email: '', address: '', card: '', expiry: '', cvv: '' });
    const f = (k: string) => (v: string) => setForm(p => ({ ...p, [k]: v }));

    const STEPS = ['Shipping', 'Payment', 'Review'];

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={s.flex}>
            <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={{ color: C.accent }}>← Back to Cart</Text>
                </TouchableOpacity>
                <Text style={s.detailTitle}>Checkout</Text>

                {/* Step Indicator */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    {STEPS.map((label, i) => (
                        <React.Fragment key={label}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={[s.stepDot, { backgroundColor: step >= i + 1 ? C.accent : C.border }]}>
                                    <Text style={{ color: '#fff', fontWeight: '800', fontSize: 12 }}>
                                        {step > i + 1 ? '✓' : String(i + 1)}
                                    </Text>
                                </View>
                                <Text style={[s.muted, { fontSize: 11, marginTop: 4 }]}>{label}</Text>
                            </View>
                            {i < 2 && (
                                <View style={{ flex: 1, height: 2, backgroundColor: step > i + 1 ? C.green : C.border, marginBottom: 16 }} />
                            )}
                        </React.Fragment>
                    ))}
                </View>

                <Card>
                    {step === 1 && (
                        <View style={{ gap: 12 }}>
                            <Text style={s.sectionTitle}>Shipping Info</Text>
                            <Input placeholder="Full Name" value={form.name} onChangeText={f('name')} />
                            <Input placeholder="Email" value={form.email} onChangeText={f('email')} keyboardType="email-address" />
                            <Input placeholder="Street Address" value={form.address} onChangeText={f('address')} />
                            <Btn label="Continue to Payment →" onPress={() => setStep(2)} style={{ width: '100%' }} />
                        </View>
                    )}

                    {step === 2 && (
                        <View style={{ gap: 12 }}>
                            <Text style={s.sectionTitle}>Payment Details</Text>
                            <View style={s.infoBanner}>
                                <Text style={{ color: C.accent, fontSize: 13 }}>🔒 Secured with 256-bit SSL</Text>
                            </View>
                            <Input placeholder="Card Number" value={form.card} onChangeText={f('card')} keyboardType="numeric" />
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <Input placeholder="MM/YY" value={form.expiry} onChangeText={f('expiry')} style={{ flex: 1 }} />
                                <Input placeholder="CVV" value={form.cvv} onChangeText={f('cvv')} keyboardType="numeric" style={{ flex: 1 }} />
                            </View>
                            <Btn label="Review Order →" onPress={() => setStep(3)} style={{ width: '100%' }} />
                        </View>
                    )}

                    {step === 3 && (
                        <View>
                            <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Order Review</Text>
                            {cart.map(i => (
                                <View key={i.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 14, color: C.textSub }}>{i.emoji} {i.name} ×{i.qty}</Text>
                                    <Text style={{ color: C.accent, fontWeight: '700' }}>{formatPrice(i.price * i.qty)}</Text>
                                </View>
                            ))}
                            <View style={s.divider} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: '800', color: C.text, fontSize: 16 }}>Total</Text>
                                <Text style={{ fontWeight: '800', color: C.accent, fontSize: 18 }}>{formatPrice(total)}</Text>
                            </View>
                            <Btn label="Place Order 🎉" onPress={onComplete} style={{ width: '100%', marginTop: 14 }} />
                        </View>
                    )}
                </Card>
                <View style={{ height: 30 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};