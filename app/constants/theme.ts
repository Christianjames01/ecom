import { Dimensions } from 'react-native';

export const { width: SW, height: SH } = Dimensions.get('window');

export const C = {
  bg: '#0a0a0f',
  surface: '#12121a',
  card: '#1a1a26',
  border: '#2a2a40',
  accent: '#6c63ff',
  accentLight: 'rgba(108,99,255,0.13)',
  gold: '#f5c842',
  green: '#22d3a5',
  red: '#ff5c7a',
  orange: '#ff9a3c',
  text: '#f0f0ff',
  textSub: '#8888aa',
  textMuted: '#55556a',
};

export const STATUS_COLORS: Record<string, string> = {
  Delivered: C.green,
  Shipped: C.accent,
  Processing: C.gold,
  Pending: C.orange,
  Active: C.green,
  Blocked: C.red,
};

export const BOT_REPLIES = [
  "I'll connect you with an admin shortly!",
  "Your satisfaction is our priority. Let me look into that.",
  "Our return policy allows 30 days from delivery.",
  "An admin will follow up within 2 hours.",
  "You can track orders in the 'My Orders' section.",
];