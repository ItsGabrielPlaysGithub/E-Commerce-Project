'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { CheckoutSuccessContent } from '@/features/b2b/checkout';
import { toast } from 'sonner';
import { gql } from '@apollo/client';
import { GET_CLIENT_ORDERS } from '@/features/b2b/orders/services/query';

const REDIRECT_DELAY_SECONDS = 5;

interface ConfirmPaymongoPaymentResponse {
  confirmPaymongoPayment: {
    orderId: number;
    status: string;
    paymentStatus: string;
  };
}

const CONFIRM_PAYMONGO_PAYMENT = gql`
  mutation ConfirmPaymongoPayment($orderId: Int!) {
    confirmPaymongoPayment(orderId: $orderId) {
      orderId
      status
      paymentStatus
    }
  }
`;

export default function B2BCheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | undefined>(undefined);
  const [orderNumber, setOrderNumber] = useState<string | undefined>(undefined);
  const [orderAmount, setOrderAmount] = useState<number | undefined>(undefined);
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_SECONDS);
  const [confirmPayment, { loading: confirming, error: confirmError }] = useMutation<ConfirmPaymongoPaymentResponse>(CONFIRM_PAYMONGO_PAYMENT, {
    refetchQueries: [{ query: GET_CLIENT_ORDERS }],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    const id = searchParams.get('orderId');
    const orderNum = searchParams.get('orderNumber');
    const grandTotal = searchParams.get('grandTotal');
    
    console.log('[SUCCESS PAGE] orderId from URL:', id);
    console.log('[SUCCESS PAGE] orderNumber from URL:', orderNum);
    console.log('[SUCCESS PAGE] grandTotal from URL:', grandTotal);
    
    setOrderId(id || undefined);
    setOrderNumber(orderNum || undefined);
    if (grandTotal) {
      setOrderAmount(parseInt(grandTotal, 10));
    }

    // Confirm payment with backend when page loads
    if (id) {
      console.log('[SUCCESS PAGE] Calling confirmPaymongoPayment mutation with orderId:', id);
      confirmPayment({
        variables: {
          orderId: parseInt(id, 10),
        },
      }).then((result) => {
        console.log('[SUCCESS PAGE] Mutation success, result:', result);
        if (result.data?.confirmPaymongoPayment) {
          console.log('[SUCCESS PAGE] Order status updated to:', result.data.confirmPaymongoPayment.status);
          toast.success('Payment confirmed! Order status updated.');
        }
      }).catch((error) => {
        console.error('[SUCCESS PAGE] Failed to confirm PayMongo payment:', error);
        toast.error('Failed to confirm payment: ' + (error.message || 'Unknown error'));
      });
    }
  }, [searchParams, confirmPayment]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/b2b/my-orders');
    }
  }, [countdown, router]);

  const handleBackHome = () => router.push('/b2b/home');
  const handleViewInvoice = () => router.push('/b2b/my-orders');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-8">
      <CheckoutSuccessContent
        orderId={orderId}
        orderNumber={orderNumber}
        orderAmount={orderAmount}
        countdown={countdown}
        onBackHome={handleBackHome}
        onViewInvoice={handleViewInvoice}
      />
    </div>
  );
}
