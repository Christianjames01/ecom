import React, { useRef } from 'react';
import {
    View, Text, ScrollView, TouchableOpacity, TextInput,
    KeyboardAvoidingView, Platform,
} from 'react-native';
import { Chat } from '../../types';
import { C } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';
import { Card } from '../ui/SharedComponents';

interface AdminChatsProps {
    chats: Chat[];
    setChats: (c: Chat[]) => void;
    activeChat: number | null;
    setActiveChat: (id: number | null) => void;
    chatInput: string;
    setChatInput: (v: string) => void;
    sendAdminMsg: () => void;
}

export const AdminChatsScreen = ({
    chats, setChats, activeChat, setActiveChat,
    chatInput, setChatInput, sendAdminMsg,
}: AdminChatsProps) => {
    const scrollRef = useRef<ScrollView>(null);
    const active = chats.find(c => c.id === activeChat);

    const selectChat = (id: number) => {
        setActiveChat(id);
        setChats(chats.map(c => c.id === id ? { ...c, unread: 0 } : c));
    };

    // Conversation list view
    if (!active) {
        return (
            <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
                <Text style={s.sectionTitle}>
                    Chat Center ({chats.reduce((s, c) => s + c.unread, 0)} unread)
                </Text>
                {chats.map(c => (
                    <TouchableOpacity key={c.id} onPress={() => selectChat(c.id)} activeOpacity={0.8}>
                        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                            <View style={s.avatar}>
                                <Text style={s.avatarText}>{c.avatar}</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontWeight: '700', color: C.text }}>{c.user}</Text>
                                <Text style={[s.muted, { fontSize: 13 }]} numberOfLines={1}>{c.lastMsg}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', gap: 4 }}>
                                <Text style={[s.muted, { fontSize: 11 }]}>{c.time}</Text>
                                {c.unread > 0 && (
                                    <View style={s.navBadge}>
                                        <Text style={s.navBadgeText}>{c.unread}</Text>
                                    </View>
                                )}
                            </View>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }

    // Active chat view
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.flex}>
            {/* Chat Header */}
            <View style={s.chatHeader}>
                <TouchableOpacity onPress={() => setActiveChat(null)} style={{ marginRight: 12 }}>
                    <Text style={{ color: C.accent, fontSize: 15 }}>← Back</Text>
                </TouchableOpacity>
                <View style={s.avatar}>
                    <Text style={s.avatarText}>{active.avatar}</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontWeight: '700', color: C.text }}>{active.user}</Text>
                    <Text style={{ fontSize: 11, color: C.green }}>● Online</Text>
                </View>
            </View>

            {/* Messages */}
            <ScrollView
                ref={scrollRef}
                style={s.flex}
                contentContainerStyle={{ padding: 14, gap: 10 }}
                onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
                {active.messages.map((m, i) => (
                    <View
                        key={i}
                        style={{
                            alignSelf: m.from === 'user' ? 'flex-start' : 'flex-end',
                            maxWidth: '80%',
                        }}
                    >
                        <Text style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>
                            {m.from === 'user' ? active.user : 'You (Admin)'}
                        </Text>
                        <View style={m.from === 'user' ? s.bubbleBot : s.bubbleUser}>
                            <Text style={{ color: m.from === 'user' ? C.text : '#fff', fontSize: 14 }}>
                                {m.text}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Reply Input */}
            <View style={s.chatInputRow}>
                <TextInput
                    style={[s.input, { flex: 1 }]}
                    placeholder="Reply to customer…"
                    placeholderTextColor={C.textMuted}
                    value={chatInput}
                    onChangeText={setChatInput}
                    onSubmitEditing={sendAdminMsg}
                    returnKeyType="send"
                />
                <TouchableOpacity style={s.sendBtn} onPress={sendAdminMsg} activeOpacity={0.8}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};