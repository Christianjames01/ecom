import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Modal, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Product } from '../../types';
import { CATEGORIES } from '../../constants/data';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card, Input, Stars } from '../ui/SharedComponents';

interface AdminProductsProps {
    products: Product[];
    setProducts: (ps: Product[]) => void;
    showToast: (msg: string) => void;
}

type FormState = { name: string; price: string; category: string; stock: string; description: string };

export const AdminProductsScreen = ({ products, setProducts, showToast }: AdminProductsProps) => {
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState<FormState>({ name: '', price: '', category: '', stock: '', description: '' });

    const f = (k: keyof FormState) => (v: string) => setForm(p => ({ ...p, [k]: v }));

    const openAdd = () => {
        setEditId(null);
        setForm({ name: '', price: '', category: '', stock: '', description: '' });
        setModal(true);
    };

    const openEdit = (p: Product) => {
        setEditId(p.id);
        setForm({ name: p.name, price: String(p.price), category: p.category, stock: String(p.stock), description: p.description || '' });
        setModal(true);
    };

    const save = () => {
        if (!form.name || !form.price) { Alert.alert('Error', 'Name and price required'); return; }
        if (editId) {
            setProducts(products.map(p => p.id === editId
                ? { ...p, ...form, price: +form.price, stock: +form.stock }
                : p
            ));
            showToast('Product updated!');
        } else {
            const newProduct: Product = {
                id: Date.now(), emoji: '📦', badge: null, rating: 4.5, reviews: 0,
                original: +form.price, ...form, price: +form.price, stock: +form.stock || 0,
            };
            setProducts([...products, newProduct]);
            showToast('Product added!');
        }
        setModal(false);
    };

    const deleteProduct = (id: number) => {
        setProducts(products.filter(p => p.id !== id));
        showToast('Product deleted');
    };

    return (
        <View style={s.flex}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 }}>
                <Text style={s.sectionTitle}>{products.length} Products</Text>
                <Btn label="+ Add Product" onPress={openAdd} />
            </View>

            <FlatList
                data={products}
                keyExtractor={p => String(p.id)}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
                renderItem={({ item: p }) => (
                    <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <Text style={{ fontSize: 36 }}>{p.emoji}</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '700', color: C.text, fontSize: 14 }} numberOfLines={1}>{p.name}</Text>
                            <Text style={s.muted}>{p.category}</Text>
                            <Text style={{ color: C.accent, fontWeight: '700', fontSize: 13 }}>
                                ${p.price.toFixed(2)} · {p.stock} in stock
                            </Text>
                            <Stars rating={p.rating} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <TouchableOpacity onPress={() => openEdit(p)}>
                                <Text style={{ fontSize: 20 }}>✏️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteProduct(p.id)}>
                                <Text style={{ fontSize: 20 }}>🗑️</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                )}
            />

            <Modal visible={modal} animationType="slide" transparent>
                <View style={s.modalOverlay}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                        <View style={s.modalBox}>
                            <Text style={[s.sectionTitle, { marginBottom: 16 }]}>{editId ? 'Edit' : 'Add'} Product</Text>
                            <View style={{ gap: 10 }}>
                                <Input placeholder="Product Name" value={form.name} onChangeText={f('name')} />
                                <Input placeholder="Price" value={form.price} onChangeText={f('price')} keyboardType="numeric" />
                                <Input placeholder="Category (e.g. Electronics)" value={form.category} onChangeText={f('category')} />
                                <Input placeholder="Stock quantity" value={form.stock} onChangeText={f('stock')} keyboardType="numeric" />
                                <Input placeholder="Description" value={form.description} onChangeText={f('description')} multiline />
                                <View style={{ flexDirection: 'row', gap: 10, marginTop: 4 }}>
                                    <Btn label={editId ? 'Save' : 'Add'} onPress={save} style={{ flex: 1 }} />
                                    <Btn label="Cancel" onPress={() => setModal(false)} variant="ghost" />
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </View>
    );
};