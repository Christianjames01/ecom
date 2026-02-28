import { StyleSheet } from 'react-native';
import { C } from '../components/theme';

export const sharedStyles = StyleSheet.create({
    // Layout
    flex: { flex: 1, backgroundColor: C.bg },
    center: { alignItems: 'center', justifyContent: 'center' },
    row: { flexDirection: 'row', alignItems: 'center' },

    // Typography
    logoText: { fontSize: 30, fontWeight: '900', color: C.text, letterSpacing: -1 },
    logoText2: { fontSize: 18, fontWeight: '900', color: C.text, letterSpacing: -0.5 },
    sectionTitle: { fontSize: 17, fontWeight: '800', color: C.text },
    detailTitle: { fontSize: 24, fontWeight: '900', color: C.text, letterSpacing: -0.5 },
    muted: { fontSize: 13, color: C.textMuted },
    label: { fontSize: 12, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '700' },

    // Card
    card: {
        backgroundColor: C.card,
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 14,
        padding: 16,
    },

    // Button
    btn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 6, paddingHorizontal: 18, paddingVertical: 11, borderRadius: 10,
    },
    btnPrimary: { backgroundColor: C.accent },
    btnGhost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: C.border },
    btnDanger: { backgroundColor: C.red },
    btnSm: { paddingHorizontal: 13, paddingVertical: 7 },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

    // Input
    input: {
        backgroundColor: C.surface, borderWidth: 1, borderColor: C.border,
        borderRadius: 10, paddingHorizontal: 13, paddingVertical: 11,
        color: C.text, fontSize: 14,
    },

    // Tag / Badge
    tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    tagText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },

    // Navigation
    topbar: {
        height: 56, flexDirection: 'row', alignItems: 'center',
        justifyContent: 'space-between', paddingHorizontal: 16,
        borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.surface,
    },
    bottomNav: {
        flexDirection: 'row', backgroundColor: C.surface,
        borderTopWidth: 1, borderTopColor: C.border, paddingBottom: 4,
    },
    navItem: { flex: 1, alignItems: 'center', paddingVertical: 8, position: 'relative' },
    navLabel: { fontSize: 10, color: C.textMuted, marginTop: 2, fontWeight: '600' },
    navBadge: {
        position: 'absolute', top: 4, right: 8,
        backgroundColor: C.red, borderRadius: 9,
        width: 18, height: 18, alignItems: 'center', justifyContent: 'center',
    },
    navBadgeText: { color: '#fff', fontSize: 10, fontWeight: '900' },

    // Avatar
    avatar: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: C.accentLight, alignItems: 'center', justifyContent: 'center',
    },
    avatarText: { fontWeight: '800', fontSize: 14, color: C.accent },

    // Chat
    chatHeader: {
        flexDirection: 'row', alignItems: 'center', padding: 14,
        borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.surface,
    },
    chatInputRow: {
        flexDirection: 'row', gap: 8, padding: 12,
        borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.surface,
    },
    bubbleUser: {
        backgroundColor: C.accent, padding: 12,
        borderRadius: 16, borderBottomRightRadius: 4,
    },
    bubbleBot: {
        backgroundColor: C.card, borderWidth: 1, borderColor: C.border,
        padding: 12, borderRadius: 16, borderBottomLeftRadius: 4,
    },
    sendBtn: {
        backgroundColor: C.accent, paddingHorizontal: 16,
        paddingVertical: 10, borderRadius: 10,
        alignItems: 'center', justifyContent: 'center',
    },

    // Misc
    divider: { height: 1, backgroundColor: C.border, marginVertical: 12 },
    toast: {
        position: 'absolute', bottom: 80, left: 20, right: 20,
        backgroundColor: C.accent, padding: 14, borderRadius: 12,
        alignItems: 'center', zIndex: 9999,
        shadowColor: C.accent, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10,
    },
    modalOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
        alignItems: 'center', justifyContent: 'center', padding: 20,
    },
    modalBox: {
        backgroundColor: C.card, borderRadius: 18, padding: 24,
        width: '100%', maxWidth: 400, borderWidth: 1, borderColor: C.border,
    },
    toggle: { width: 42, height: 24, borderRadius: 12, backgroundColor: C.border, position: 'relative' },
    toggleOn: { backgroundColor: C.accent },
    toggleDot: { position: 'absolute', top: 3, width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
    fab: {
        position: 'absolute', bottom: 72, right: 20,
        width: 52, height: 52, borderRadius: 26,
        backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center',
        shadowColor: C.accent, shadowOpacity: 0.5, shadowRadius: 12, elevation: 8,
    },
    infoBanner: { backgroundColor: C.accentLight, borderRadius: 10, padding: 12 },
    stepDot: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
    statusBtn: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: C.border },
    tabBar: { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 10, padding: 4 },
    tabBtn: { flex: 1, paddingVertical: 9, alignItems: 'center', borderRadius: 8 },
    tabBtnActive: { backgroundColor: C.accentLight },
    tabBtnText: { fontWeight: '700', fontSize: 14, color: C.textSub },
    roleBtn: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 6, padding: 12, borderRadius: 10, borderWidth: 2,
        borderColor: C.border, backgroundColor: C.surface,
    },
    roleBtnActive: { borderColor: C.accent, backgroundColor: C.accentLight },
    searchBar: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface,
        borderWidth: 1, borderColor: C.border, borderRadius: 12,
        paddingHorizontal: 12, paddingVertical: 4, gap: 8,
    },
    searchInput: { flex: 1, color: C.text, fontSize: 14, paddingVertical: 8 },
    filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: C.border, backgroundColor: C.surface },
    filterChipActive: { borderColor: C.accent, backgroundColor: C.accentLight },
    qtyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, borderRadius: 10, borderWidth: 1, borderColor: C.border },
    qtyBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    qtyBtnText: { color: C.text, fontWeight: '700', fontSize: 18 },
    qtyNum: { paddingHorizontal: 12, fontWeight: '700', color: C.text, fontSize: 16 },
    cartFooter: { padding: 16, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.surface },
    hero: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 18, padding: 24 },
    heroSub: { fontSize: 12, color: C.accent, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
    heroTitle: { fontSize: 30, fontWeight: '900', color: C.text, lineHeight: 36, marginBottom: 10, letterSpacing: -0.5 },
    catChip: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 14, alignItems: 'center', minWidth: 90 },
    productCard: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: 14, overflow: 'hidden' },
    productImgBox: { backgroundColor: C.surface, padding: 20, alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 110 },
    productName: { fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 4, marginTop: 4 },
    price: { fontSize: 17, fontWeight: '800', color: C.accent },
    addBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.accent, alignItems: 'center', justifyContent: 'center' },
    wishBtn: { position: 'absolute', top: 8, right: 8 },
    wishLargeBtn: { width: 50, height: 50, borderRadius: 12, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
});