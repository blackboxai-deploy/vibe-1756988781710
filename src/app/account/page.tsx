"use client"

import Layout from '@/components/Layout';
import AuthForm from '@/components/AuthForm';
import ProfileInfo from '@/components/ProfileInfo';
import OrderHistory from '@/components/OrderHistory';
import { useAuth } from '@/context/AuthContext';

export default function AccountPage() {
  const { state } = useAuth();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        {!state.isLoggedIn ? (
          <div className="max-w-md mx-auto">
            <AuthForm />
          </div>
        ) : (
          <div className="space-y-12">
            <ProfileInfo />
            <OrderHistory />
          </div>
        )}
      </div>
    </Layout>
  );
}