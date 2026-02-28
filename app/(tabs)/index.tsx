import React, { useState } from 'react';
import { AuthUser } from '../types';
import { AuthScreen } from '../components/auth/AuthScreen';
import { CustomerApp } from '../components/customer/CustomerApp';
import { AdminApp } from '../components/admin/AdminApp';

/**
 * NexusStore - Main Entry Point
 * 
 * File Structure:
 * ├── types/index.ts                          ← All TypeScript interfaces
 * ├── constants/
 * │   ├── theme.ts                            ← Colors, dimensions, constants
 * │   ├── styles.ts                           ← Shared StyleSheet
 * │   └── data.ts                             ← Mock products, orders, users, chats
 * ├── components/
 * │   ├── ui/
 * │   │   ├── SharedComponents.tsx            ← Btn, Input, Card, Tag, Stars, Toast
 * │   │   ├── ProductCard.tsx                 ← Reusable product card
 * │   │   └── ChatWidget.tsx                  ← Customer chat modal
 * │   ├── auth/
 * │   │   └── AuthScreen.tsx                  ← Login / Register screen
 * │   ├── customer/
 * │   │   └── CustomerApp.tsx                 ← Customer shell + navigation
 * │   └── admin/
 * │       └── AdminApp.tsx                    ← Admin shell + navigation
 * └── screens/
 *     ├── customer/
 *     │   ├── HomeScreen.tsx                  ← Hero, featured, categories
 *     │   ├── ShopScreen.tsx                  ← Search, filter, product grid
 *     │   ├── ProductDetailScreen.tsx         ← Product info, reviews
 *     │   ├── CheckoutScreen.tsx              ← 3-step checkout flow
 *     │   └── OtherScreens.tsx                ← Cart, Wishlist, Orders, Profile
 *     └── admin/
 *         ├── AdminDashboard.tsx              ← Metrics, chart, quick actions
 *         ├── AdminProductsScreen.tsx         ← Product CRUD
 *         ├── AdminChatsScreen.tsx            ← Chat center
 *         └── AdminOtherScreens.tsx           ← Orders, Users, Settings
 */

export default function App() {
    const [user, setUser] = useState<AuthUser | null>(null);

    return (
        <>
            {!user && <AuthScreen onLogin={setUser} />}
            {user?.role === 'customer' && <CustomerApp user={user} onLogout={() => setUser(null)} />}
            {user?.role === 'admin' && <AdminApp user={user} onLogout={() => setUser(null)} />}
        </>
    );
}