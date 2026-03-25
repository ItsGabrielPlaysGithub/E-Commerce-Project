'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckoutSuccessContent } from '@/features/b2b/checkout';

const REDIRECT_DELAY_SECONDS = 5;

export default function B2BCheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_SECONDS);

  useEffect(() => {
    const id = searchParams.get('orderId');
    setOrderId(id);
  }, [searchParams]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/b2b/home');
    }
  }, [countdown, router]);

  const handleBackHome = () => router.push('/b2b/home');
  const handleViewInvoice = () => router.push('/b2b/my-orders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <CheckoutSuccessContent
        orderId={orderId}
        countdown={countdown}
        onBackHome={handleBackHome}
        onViewInvoice={handleViewInvoice}
      />
    </div>
  );
}
