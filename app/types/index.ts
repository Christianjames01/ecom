export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    original: number;
    rating: number;
    reviews: number;
    stock: number;
    emoji: string;
    badge: string | null;
    description?: string;
}

export interface CartItem extends Product {
    qty: number;
}

export interface Order {
    id: string;
    customer: string;
    items: number;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
    date: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    orders: number;
    spent: number;
    status: 'Active' | 'Blocked';
    joined: string;
}

export interface ChatMessage {
    from: 'user' | 'admin' | 'bot';
    text: string;
    time: string;
}

export interface Chat {
    id: number;
    user: string;
    avatar: string;
    lastMsg: string;
    time: string;
    unread: number;
    messages: ChatMessage[];
}

export interface AuthUser {
    name: string;
    email: string;
    role: 'customer' | 'admin';
}