"use client"

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';

export default function CheckoutPage() {
  const { state: cartState, clearCart } = useCart();
  const { state: authState, addOrder } = useAuth();
  const [shippingInfo, setShippingInfo] = useState({
    name: authState.user?.name || '',
    email: authState.user?.email || '',
    phone: '',
    street: authState.user?.address?.street || '',
    city: authState.user?.address?.city || '',
    zip: authState.user?.address?.zip || '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cartState.items.length === 0 && !orderPlaced) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-nude-text mb-4">Your cart is empty</h1>
            <p className="text-nude-muted mb-8">Add some coffees before checkout</p>
            <Link href="/products" className="bg-nude-accent text-nude-secondary px-6 py-3 font-semibold hover:bg-nude-text transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!authState.isLoggedIn) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-nude-text mb-4">Sign in to continue</h1>
              <p className="text-nude-muted">Please sign in or create an account to complete your order</p>
            </div>
            <AuthForm />
          </div>
        </div>
      </Layout>
    );
  }

  const shippingCost = 0; // Free shipping
  const tax = cartState.total * 0.08; // 8% tax
  const total = cartState.total + shippingCost + tax;

  const handleSubmitOrder = () => {
    const order = {
      items: cartState.items.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      status: 'completed' as const,
    };
    addOrder(order);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-nude-secondary p-8 rounded-lg shadow-sm border border-nude-accent text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-nude-text mb-4">Order Placed Successfully!</h1>
            <p className="text-nude-muted mb-6">
              Thank you for your order! We'll start brewing your coffee drinks right away.
            </p>
            <p className="text-sm text-nude-muted mb-6">
              Order ID: #{Date.now()}<br/>
              Total: ${total.toFixed(2)}
            </p>
            <Link href="/account" className="bg-nude-accent text-nude-secondary px-6 py-3 font-semibold hover:bg-nude-text transition-colors">
              View Order History
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-nude-text">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Order Details */}
          <div>
            <div className="lg:sticky lg:top-4">
              <h2 className="text-xl font-semibold text-nude-text mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartState.items.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 p-3 bg-nude-secondary rounded-lg">
                    <div className="w-12 h-12 bg-nude-primary rounded overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-nude-text">{item.name}</h4>
                      <p className="text-sm text-nude-muted">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-nude-accent">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-nude-secondary p-4 rounded-lg border border-nude-accent">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-nude-muted">
                    <span>Subtotal</span>
                    <span>${cartState.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-nude-muted">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-nude-muted">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-nude-text">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            {step === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-nude-text mb-6">Shipping Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-nude-text font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={shippingInfo.name}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                      className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-nude-text font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-nude-text font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-nude-text font-medium mb-2">Shipping Address</label>
                    <input
                      type="text"
                      value={shippingInfo.street}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                      placeholder="Street address"
                      className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent mb-2"
                      required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        placeholder="City"
                        className="px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                        required
                      />
                      <input
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                        placeholder="ZIP Code"
                        className="px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-nude-accent text-nude-secondary px-8 py-3 font-semibold hover:bg-nude-text transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-nude-text mb-6">Payment Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-nude-text font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-nude-text font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-nude-text font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        placeholder="123"
                        className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-nude-text font-medium mb-2">Name on Card</label>
                    <input
                      type="text"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, nameOnCard: e.target.value })}
                      className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-nude-accent text-nude-accent px-4 py-3 font-semibold hover:bg-nude-accent hover:text-nude-secondary transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 bg-nude-accent text-nude-secondary px-4 py-3 font-semibold hover:bg-nude-text transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-nude-text mb-6">Confirm Order</h2>
                <div className="bg-nude-secondary p-4 rounded-lg border border-nude-accent mb-6">
                  <h3 className="font-semibold text-nude-text mb-3">Order Details</h3>
                  <div className="space-y-2 text-sm text-nude-muted">
                    <p><strong>Shipping to:</strong> {shippingInfo.name}, {shippingInfo.street}</p>
                    <p><strong>Email:</strong> {shippingInfo.email}</p>
                    <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-sm text-nude-muted mb-6">
                  <p>By placing this order, you agree to our terms of service and privacy policy.</p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 border border-nude-accent text-nude-accent px-4 py-3 font-semibold hover:bg-nude-accent hover:text-nude-secondary transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitOrder}
                    className="flex-1 bg-nude-accent text-nude-secondary px-4 py-3 font-semibold hover:bg-nude-text transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}