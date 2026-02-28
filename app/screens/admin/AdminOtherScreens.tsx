import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Order, User } from '../../types';
import { C, STATUS_COLORS } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Btn, Card, Tag, Input } from '../ui/SharedComponents';

// ─── ORDERS ───────────────────────────────────────────────────────────────────
interface AdminOrdersProps {
    orders: Order[];
    setOrders: (o: Order[]) => void;
    showToast: (msg: string) => void;
}

const ORDER_STATUSES: Order['status'][] = ['Pending', 'Processing', 'Shipped', 'Delivered'];

export const AdminOrdersScreen = ({ orders, setOrders, showToast }: AdminOrdersProps) => {
    const update = (id: string, status: Order['status']) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
        showToast(`Order updated to ${status}`);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text style={s.sectionTitle}>All Orders ({orders.length})</Text>
            {orders.map(o => (
                <Card key={o.id}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <View>
                            <Text style={{ fontWeight: '700', color: C.accent }}>{o.id}</Text>
                            <Text style={{ fontWeight: '600', color: C.text }}>{o.customer}</Text>
                            <Text style={s.muted}>{o.date} · {o.items} items</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ fontWeight: '800', color: C.text, marginBottom: 6 }}>${o.total.toFixed(2)}</Text>
                            <Tag text={o.status} color={STATUS_COLORS[o.status] || C.textMuted} />
                        </View>
                    </View>
                    {/* Status buttons */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', gap: 6 }}>
                            {ORDER_STATUSES.map(st => (
                                <TouchableOpacity
                                    key={st}
                                    onPress={() => update(o.id, st)}
                                    style={[
                                        s.statusBtn,
                                        o.status === st && {
                                            backgroundColor: (STATUS_COLORS[st] || C.accent) + '33',
                                            borderColor: STATUS_COLORS[st] || C.accent,
                                        },
                                    ]}
                                >
                                    <Text style={[
                                        { fontSize: 12, fontWeight: '600' },
                                        o.status === st ? { color: STATUS_COLORS[st] || C.accent } : { color: C.textMuted },
                                    ]}>
                                        {st}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </Card>
            ))}
        </ScrollView>
    );
};

// ─── USERS ────────────────────────────────────────────────────────────────────
interface AdminUsersProps {
    users: User[];
    setUsers: (u: User[]) => void;
    showToast: (msg: string) => void;
}

export const AdminUsersScreen = ({ users, setUsers, showToast }: AdminUsersProps) => {
    const toggle = (id: number) => {
        setUsers(users.map(u => u.id === id
            ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' }
            : u
        ));
        showToast('User status updated');
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            <Text style={s.sectionTitle}>All Users ({users.length})</Text>
            {users.map(u => (
                <Card key={u.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={s.avatar}>
                        <Text style={s.avatarText}>{u.name[0]}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: '700', color: C.text }}>{u.name}</Text>
                        <Text style={[s.muted, { fontSize: 12 }]}>{u.email}</Text>
                        <Text style={[s.muted, { fontSize: 12 }]}>{u.orders} orders · ${u.spent.toFixed(0)} spent</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 6 }}>
                        <Tag text={u.status} color={STATUS_COLORS[u.status] || C.textMuted} />
                        <TouchableOpacity
                            onPress={() => toggle(u.id)}
                            style={[s.statusBtn, { borderColor: u.status === 'Active' ? C.red : C.green }]}
                        >
                            <Text style={{ fontSize: 12, color: u.status === 'Active' ? C.red : C.green, fontWeight: '600' }}>
                                {u.status === 'Active' ? 'Block' : 'Unblock'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
};

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
interface AdminSettingsProps {
    showToast: (msg: string) => void;
    onLogout: () => void;
}

export const AdminSettingsScreen = ({ showToast, onLogout }: AdminSettingsProps) => (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 14 }}>
        <Text style={s.detailTitle}>Settings</Text>

        <Card>
            <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Store Configuration</Text>
            <View style={{ gap: 10 }}>
                <Input placeholder="Store Name" value="NexusStore" onChangeText={() => { }} />
                <Input placeholder="Admin Email" value="admin@nexusstore.com" onChangeText={() => { }} keyboardType="email-address" />
                <Input placeholder="Store URL" value="https://nexusstore.com" onChangeText={() => { }} />
                <Btn label="Save Settings" onPress={() => showToast('Settings saved!')} style={{ width: '100%' }} />
            </View>
        </Card>

        <Card>
            <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Security</Text>
            <View style={{ gap: 10 }}>
                <Input placeholder="Current Password" value="" onChangeText={() => { }} secureTextEntry />
                <Input placeholder="New Password" value="" onChangeText={() => { }} secureTextEntry />
                <Input placeholder="Confirm Password" value="" onChangeText={() => { }} secureTextEntry />
                <Btn label="Update Password" onPress={() => showToast('Password updated!')} style={{ width: '100%' }} />
            </View>
        </Card>

        <Card>
            <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Notifications</Text>
            {[
                ['Email for new orders', true],
                ['SMS for low stock alerts', false],
                ['Weekly analytics report', true],
            ].map(([lbl, def]) => (
                <View key={lbl as string} style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border,
                }}>
                    <Text style={{ fontSize: 14, color: C.text }}>{lbl as string}</Text>
                    <View style={[s.toggle, def ? s.toggleOn : {}]}>
                        <View style={[s.toggleDot, def ? { left: 20 } : { left: 2 }]} />
                    </View>
                </View>
            ))}
        </Card>

        <Btn label="Sign Out" onPress={onLogout} variant="danger" style={{ width: '100%' }} />
        <View style={{ height: 30 }} />
    </ScrollView>
);