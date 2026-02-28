import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Order, User, Chat } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card } from '../ui/SharedComponents';
import { SW } from '../../constants/theme';

interface AdminDashboardProps {
    orders: Order[];
    users: User[];
    chats: Chat[];
    setPage: (p: string) => void;
}

export const AdminDashboard = ({ orders, users, chats, setPage }: AdminDashboardProps) => {
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pending = orders.filter(o => o.status === 'Pending').length;
    const unread = chats.reduce((sum, c) => sum + c.unread, 0);

    const metrics = [
        { label: 'Revenue', value: `$${revenue.toFixed(0)}`, emoji: '💰', color: C.green },
        { label: 'Orders', value: String(orders.length), emoji: '📦', color: C.accent },
        { label: 'Pending', value: String(pending), emoji: '⏳', color: C.orange },
        { label: 'Users', value: String(users.length), emoji: '👥', color: C.gold },
    ];

    return (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
            <Text style={s.detailTitle}>Overview</Text>

            {/* Metric cards */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {metrics.map(m => (
                    <Card key={m.label} style={{ flex: 1, minWidth: (SW - 52) / 2, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 26 }}>{m.emoji}</Text>
                        <Text style={{ fontWeight: '800', fontSize: 24, color: m.color, marginTop: 6 }}>{m.value}</Text>
                        <Text style={s.muted}>{m.label}</Text>
                    </Card>
                ))}
            </View>

            {/* Weekly Sales Chart */}
            <Card>
                <Text style={[s.sectionTitle, { marginBottom: 14 }]}>Weekly Sales</Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', height: 80, gap: 6 }}>
                    {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                        <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                            <View style={{
                                width: '100%', height: (h / 100) * 72,
                                backgroundColor: C.accent + 'bb', borderRadius: 4,
                            }} />
                            <Text style={{ fontSize: 9, color: C.textMuted }}>{'SMTWTFS'[i]}</Text>
                        </View>
                    ))}
                </View>
            </Card>

            {/* Category breakdown */}
            <Card>
                <Text style={[s.sectionTitle, { marginBottom: 14 }]}>Sales by Category</Text>
                {[['Electronics', 45], ['Fashion', 25], ['Home', 18], ['Kitchen', 12]].map(([cat, pct]) => (
                    <View key={cat} style={{ marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text style={{ fontSize: 13, color: C.text }}>{cat}</Text>
                            <Text style={s.muted}>{pct}%</Text>
                        </View>
                        <View style={{ backgroundColor: C.surface, borderRadius: 4, height: 6, overflow: 'hidden' }}>
                            <View style={{
                                height: '100%', width: `${pct}%`,
                                backgroundColor: C.accent, borderRadius: 4,
                            }} />
                        </View>
                    </View>
                ))}
            </Card>

            {/* Quick actions */}
            <Card>
                <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Quick Actions</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {[
                        ['🏷️ Products', 'products'],
                        [`💬 Chats (${unread})`, 'chats'],
                        ['📦 Orders', 'orders'],
                        ['👥 Users', 'users'],
                    ].map(([lbl, pg]) => (
                        <Btn key={pg} label={lbl} onPress={() => setPage(pg)} variant="ghost" />
                    ))}
                </View>
            </Card>
        </ScrollView>
    );
};