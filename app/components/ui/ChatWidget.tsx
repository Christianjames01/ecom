import React, { useState, useRef } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, ScrollView,
    KeyboardAvoidingView, Platform, SafeAreaView,
} from 'react-native';
import { C } from '../../constants/theme';
import { BOT_REPLIES } from '../../constants/theme';
import { sharedStyles as s } from '../../constants/styles';

interface ChatWidgetProps {
    onClose: () => void;
}

export const ChatWidget = ({ onClose }: ChatWidgetProps) => {
    const [msgs, setMsgs] = useState([
        { from: 'bot', text: "👋 Hi! I'm your support assistant. How can I help?" },
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<ScrollView>(null);

    const send = () => {
        if (!input.trim()) return;
        const txt = input;
        setMsgs(m => [...m, { from: 'user', text: txt }]);
        setInput('');
        setTimeout(() => {
            setMsgs(m => [
                ...m,
                { from: 'bot', text: BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)] },
            ]);
            scrollRef.current?.scrollToEnd({ animated: true });
        }, 800);
    };

    return (
        <View style={chatStyles.modal}>
            <SafeAreaView style={s.flex}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={s.flex}>
                    {/* Header */}
                    <View style={s.chatHeader}>
                        <View style={[s.avatar, { backgroundColor: C.accentLight }]}>
                            <Text style={{ fontSize: 18 }}>🤖</Text>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontWeight: '700', color: C.text }}>Support Chat</Text>
                            <Text style={{ fontSize: 11, color: C.green }}>● Online</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={{ marginLeft: 'auto' }}>
                            <Text style={{ color: C.textSub, fontSize: 18 }}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Messages */}
                    <ScrollView
                        ref={scrollRef}
                        style={s.flex}
                        contentContainerStyle={{ padding: 14, gap: 10 }}
                        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                    >
                        {msgs.map((m, i) => (
                            <View key={i} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                                {m.from !== 'user' && (
                                    <Text style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>🤖 Assistant</Text>
                                )}
                                <View style={m.from === 'user' ? s.bubbleUser : s.bubbleBot}>
                                    <Text style={{ color: m.from === 'user' ? '#fff' : C.text, fontSize: 14 }}>{m.text}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Input */}
                    <View style={s.chatInputRow}>
                        <TextInput
                            style={[s.input, { flex: 1 }]}
                            placeholder="Type a message…"
                            placeholderTextColor={C.textMuted}
                            value={input}
                            onChangeText={setInput}
                            onSubmitEditing={send}
                            returnKeyType="send"
                        />
                        <TouchableOpacity style={s.sendBtn} onPress={send} activeOpacity={0.8}>
                            <Text style={{ color: '#fff', fontWeight: '700' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

const chatStyles = {
    modal: {
        flex: 1,
        backgroundColor: C.bg,
        marginTop: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: C.border,
    },
};