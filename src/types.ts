export interface MenuItem {
  id: number;
  cat: string;
  name: string;
  price: number;
  time: number;
  kcal: number;
  desc: string;
  badge: string | null;
  emoji: string;
  tags: string[];
  image?: string;
  videoUrl?: string;
}

export interface CartItem extends MenuItem {
  qty: number;
}

export interface Testimonial {
  name: string;
  role: string;
  screenshot?: string;
  text: string;
  summary: string;
  rating?: number;
}

export interface GalleryPost {
  id?: string;
  emoji: string;
  caption: string;
  likes: number;
  category: 'seafood_grill' | 'ambiance' | 'cocktails' | 'regular';
  mediaType: 'image' | 'video';
  mediaUrl: string;
  videoUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'order' | 'promo' | 'alert';
}

export interface TableReservation {
  id?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  diningOption: 'brunch' | 'lunch' | 'dinner' | 'drinks';
  placement?: string;
  specialRequests?: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceType: 'delivery' | 'dine_in' | 'pickup';
  deliveryLocation?: string;
  orderTime: string;
  paymentMethod: string;
  extraNotes?: string;
  isTableReserved?: boolean;
  guestsCount?: string;
  tablePlacement?: string;
}
