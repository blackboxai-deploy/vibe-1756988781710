"use client"

import { useAuth } from '@/context/AuthContext';

export default function OrderHistory() {
  const { state } = useAuth();

  if (!state.orders.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-nude-text mb-2">No orders yet</h3>
        <p className="text-nude-muted">
          Your coffee journey starts here! Place your first order to see your history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-nude-text">Order History</h2>

      {state.orders.map((order) => (
        <div key={order.id} className="bg-nude-secondary p-6 rounded-lg shadow-sm border border-nude-accent">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-lg font-semibold text-nude-text">Order #{order.id}</span>
              <div className="text-nude-muted text-sm">{order.date}</div>
            </div>
            <div className={`text-sm font-medium px-3 py-1 rounded-full ${
              order.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center py-2 border-b border-nude-muted last:border-b-0">
                <div className="flex-1">
                  <span className="font-medium text-nude-text">{item.name}</span>
                  <span className="text-nude-muted text-sm ml-2">×{item.quantity}</span>
                </div>
                <span className="font-medium text-nude-accent">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-nude-muted">
            <span className="font-semibold text-nude-text">Total</span>
            <span className="font-bold text-xl text-nude-accent">${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}