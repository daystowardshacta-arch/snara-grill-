import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { SANARA_INFO } from '../data/menuData';
import { Minus, Plus, Trash2, ShoppingCart, Bike, Store, Utensils, MessageSquare, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, updateQty, removeFromCart, clearCart, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState<'delivery' | 'dine_in' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [orderTime, setOrderTime] = useState('ASAP');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [extraNotes, setExtraNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const deliveryFee = orderType === 'delivery' ? 3000 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) {
      errs.customerName = 'Please enter your name';
    }
    if (!customerPhone.trim()) {
      errs.customerPhone = 'Please enter your phone number';
    }
    if (orderType === 'delivery' && !deliveryLocation.trim()) {
      errs.deliveryLocation = 'Please provide delivery address in Mbezi';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleDispatchOrder = () => {
    if (!validate()) return;

    const orderId = 'SANARA-' + Math.floor(100000 + Math.random() * 900000);

    let text = `🔥 *NEW ORDER - SANARA GRILL RESTAURANT* 🔥\n`;
    text += `Ref: ${orderId}\n`;
    text += `==================================\n\n`;
    text += `👤 *Customer:* ${customerName}\n`;
    text += `📞 *Phone:* ${customerPhone}\n`;
    text += `🛵 *Option:* ${orderType.toUpperCase()}\n`;

    if (orderType === 'delivery') {
      text += `📍 *Delivery Address:* ${deliveryLocation}\n`;
    }
    text += `🕒 *Time:* ${orderTime}\n`;
    text += `💳 *Payment:* ${paymentMethod}\n\n`;

    text += `🛒 *ORDERED ITEMS:* \n`;
    cart.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} x${item.qty} = ${(item.price * item.qty).toLocaleString()} TZS\n`;
    });

    text += `\n----------------------------------\n`;
    text += `Subtotal: ${cartTotal.toLocaleString()} TZS\n`;
    if (orderType === 'delivery') {
      text += `Delivery Fee: ${deliveryFee.toLocaleString()} TZS\n`;
    }
    text += `*TOTAL AMOUNT: ${finalTotal.toLocaleString()} TZS*\n`;

    if (extraNotes.trim()) {
      text += `\n📝 *Notes:* ${extraNotes}\n`;
    }

    text += `\nPlease confirm my order. Thank you!`;

    const details = {
      id: orderId,
      customerName,
      customerPhone,
      serviceType: orderType,
      deliveryLocation,
      orderTime,
      paymentMethod,
      extraNotes
    };

    localStorage.setItem('GC_LAST_ORDER_DETAILS', JSON.stringify(details));
    localStorage.setItem('GC_LAST_ORDER_CART', JSON.stringify(cart));

    const whatsappUrl = `https://wa.me/${SANARA_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    navigate(`/order/${orderId}`);
  };

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-[#141414] text-stone-200 pt-28 pb-24 px-4 text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-950 text-stone-500 flex items-center justify-center mx-auto border border-stone-800">
            <ShoppingCart size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-amber-50">Your Cart is Empty</h2>
          <p className="text-xs text-stone-400">
            You haven't added any flame-grilled BBQ or seafood dishes to your order yet.
          </p>
          <Link
            to="/menu"
            className="inline-block mt-4 px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Explore Sanara Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-stone-200 pt-24 pb-24 px-4 md:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-amber-50">Your Order Cart</h1>
            <p className="text-xs text-stone-400 mt-1">Sanara Grill Restaurant Mbezi</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
          >
            <Trash2 size={14} /> Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-amber-100 text-sm">{item.name}</h4>
                    <p className="text-xs text-orange-400 font-bold mt-0.5">
                      {item.price.toLocaleString()} TZS
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-stone-950 px-3 py-1.5 rounded-xl border border-stone-800">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="text-stone-400 hover:text-amber-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold text-amber-100 px-1">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="text-stone-400 hover:text-amber-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:underline pt-2"
            >
              <ArrowLeft size={14} /> Add more items from menu
            </Link>
          </div>

          {/* Checkout Details Form */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-5">
            <h3 className="font-serif font-bold text-amber-100 text-lg">Checkout Details</h3>

            {/* Order Type Toggle */}
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs font-bold">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  orderType === 'delivery' ? 'bg-orange-600 text-white' : 'text-stone-400'
                }`}
              >
                <Bike size={14} /> Delivery
              </button>
              <button
                onClick={() => setOrderType('pickup')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  orderType === 'pickup' ? 'bg-orange-600 text-white' : 'text-stone-400'
                }`}
              >
                <Store size={14} /> Pickup
              </button>
              <button
                onClick={() => setOrderType('dine_in')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-colors ${
                  orderType === 'dine_in' ? 'bg-orange-600 text-white' : 'text-stone-400'
                }`}
              >
                <Utensils size={14} /> Dine-In
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-400 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-50 focus:border-orange-500 focus:outline-none"
                />
                {errors.customerName && <p className="text-rose-400 text-[10px] mt-1">{errors.customerName}</p>}
              </div>

              <div>
                <label className="block text-stone-400 font-bold mb-1">Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+255..."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-50 focus:border-orange-500 focus:outline-none"
                />
                {errors.customerPhone && <p className="text-rose-400 text-[10px] mt-1">{errors.customerPhone}</p>}
              </div>

              {orderType === 'delivery' && (
                <div>
                  <label className="block text-stone-400 font-bold mb-1">Delivery Location *</label>
                  <input
                    type="text"
                    placeholder="Mbezi area address, street name..."
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-50 focus:border-orange-500 focus:outline-none"
                  />
                  {errors.deliveryLocation && <p className="text-rose-400 text-[10px] mt-1">{errors.deliveryLocation}</p>}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-bold mb-1">Time</label>
                  <select
                    value={orderTime}
                    onChange={(e) => setOrderTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-50 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="ASAP">ASAP (Now)</option>
                    <option value="In 30 Mins">In 30 Mins</option>
                    <option value="In 1 Hour">In 1 Hour</option>
                    <option value="Later Today">Later Today</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 font-bold mb-1">Payment</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-50 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Cash / Cash on Delivery">Cash</option>
                    <option value="M-Pesa / Tigo Pesa">M-Pesa / Tigo Pesa</option>
                    <option value="NFC / Card">Credit / Debit Card</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 font-bold mb-1">Special Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="Extra spicy, no onions, extra lime..."
                  value={extraNotes}
                  onChange={(e) => setExtraNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-50 focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Price Summary */}
            <div className="pt-3 border-t border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal ({cartCount} items):</span>
                <span>{cartTotal.toLocaleString()} TZS</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between text-stone-400">
                  <span>Delivery Fee (Mbezi area):</span>
                  <span>{deliveryFee.toLocaleString()} TZS</span>
                </div>
              )}
              <div className="flex justify-between font-serif font-bold text-base text-amber-100 pt-2 border-t border-stone-800">
                <span>Total Amount:</span>
                <span className="text-orange-400">{finalTotal.toLocaleString()} TZS</span>
              </div>
            </div>

            <button
              onClick={handleDispatchOrder}
              className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-stone-950 font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} /> Order via WhatsApp ({SANARA_INFO.phonePrimary})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
