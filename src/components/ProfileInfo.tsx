"use client"

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfileInfo() {
  const { state, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    street: state.user?.address?.street || '',
    city: state.user?.address?.city || '',
    zip: state.user?.address?.zip || '',
  });

  if (!state.user) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleSave = () => {
    const updates = {
      name: editData.name,
      email: editData.email,
      phone: editData.phone,
      address: {
        street: editData.street,
        city: editData.city,
        zip: editData.zip,
        country: state.user!.address?.country || 'USA',
      },
    };
    updateProfile(updates);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-nude-secondary p-8 rounded-lg shadow-sm border border-nude-accent">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-nude-text">Account Information</h2>
        <button
          onClick={logout}
          className="text-nude-muted hover:text-nude-accent transition-colors"
        >
          Sign Out
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-nude-text font-medium mb-2">Name</label>
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
              />
            </div>
            <div>
              <label className="block text-nude-text font-medium mb-2">Email</label>
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-nude-text font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
            />
          </div>

          <div>
            <label className="block text-nude-text font-medium mb-2">Address</label>
            <input
              type="text"
              value={editData.street}
              onChange={(e) => setEditData({ ...editData, street: e.target.value })}
              placeholder="Street address"
              className="w-full px-4 py-3 mb-2 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                type="text"
                value={editData.city}
                onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                placeholder="City"
                className="px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
              />
              <input
                type="text"
                value={editData.zip}
                onChange={(e) => setEditData({ ...editData, zip: e.target.value })}
                placeholder="ZIP Code"
                className="px-4 py-3 bg-nude-primary border border-nude-accent text-nude-text focus:outline-none focus:ring-2 focus:ring-nude-accent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-nude-accent text-nude-secondary px-6 py-2 font-semibold hover:bg-nude-text transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="border border-nude-accent text-nude-accent px-6 py-2 font-semibold hover:bg-nude-accent hover:text-nude-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-nude-text mb-2">Personal Information</h3>
              <div className="space-y-2 text-nude-muted">
                <p><strong>Name:</strong> {state.user.name}</p>
                <p><strong>Email:</strong> {state.user.email}</p>
                {state.user.phone && <p><strong>Phone:</strong> {state.user.phone}</p>}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-nude-text mb-2">Shipping Address</h3>
              <div className="space-y-2 text-nude-muted">
                {state.user.address ? (
                  <>
                    <p>{state.user.address.street}</p>
                    <p>{state.user.address.city}, {state.user.address.zip}</p>
                    <p>{state.user.address.country}</p>
                  </>
                ) : (
                  <p>No address set</p>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-nude-accent text-nude-secondary px-6 py-2 font-semibold hover:bg-nude-text transition-colors"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}