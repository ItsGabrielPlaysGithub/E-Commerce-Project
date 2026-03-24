# PayMongo Integration Setup Guide

## ✅ Implementation Status: Complete

Your PayMongo payment gateway integration is now ready for setup and testing. This guide will walk you through the remaining steps.

---

## 📋 What Was Implemented

### Backend
- ✅ **PayMongo Service** - API wrapper for creating/retrieving payment intents
- ✅ **PayMongo Controller** - REST endpoints for checkout operations  
- ✅ **PayMongo Module** - Properly scoped DI container
- ✅ **Orders Integration** - New methods to initiate PayMongo checkout
- ✅ **GraphQL Mutation** - `initiatePaymongoCheckout` for frontend
- ✅ **Order Entity Updates** - New fields for payment tracking

### Frontend  
- ✅ **PayMongo Checkout Modal** - Beautiful payment UI component
- ✅ **Success Page** - Post-payment confirmation
- ✅ **Failed Page** - Payment error handling with retry option
- ✅ **Custom Hook** - Easy mutation handling

### Database
- ✅ **New Fields in Orders Table**:
  - `paymentIntentId` (string) - PayMongo Payment Intent ID
  - `paymentStatus` (enum) - UNPAID | PENDING | PAID | FAILED

---

## 🚀 Step-by-Step Setup

### Step 1: Create PayMongo Test Account (5 mins)

1. Go to **https://dashboard.paymongo.com**
2. Click "Sign Up" and create your account
3. Complete KYC verification (may take a few minutes)
4. Login to dashboard
5. Navigate to **Developers → API Keys**
6. Copy your **Test** environment keys:
   - **Public Key** (starts with `pk_test_...`)
   - **Secret Key** (starts with `sk_test_...`)

### Step 2: Update Backend Environment (2 mins)

Open `d:\ECOMM-PROJECT\backend\.env` and replace these values with your actual PayMongo test keys:

```
PAYMONGO_PUBLIC_KEY=pk_test_YOUR_PUBLIC_KEY_HERE
PAYMONGO_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
PAYMONGO_API_URL=https://api.paymongo.com/v1
PAYMONGO_CHECKOUT_SUCCESS_URL=http://localhost:3000/checkout/success
PAYMONGO_CHECKOUT_FAILED_URL=http://localhost:3000/checkout/failed
```

### Step 3: Install Dependencies (Already Done ✓)

```bash
cd d:\ECOMM-PROJECT\backend
npm install axios
```

### Step 4: Database Migration (1 min)

TypeORM will automatically create new columns on startup since `DB_SYNC=true` is set in your `.env`. However, for production, you'll need proper migrations.

**For now (development):**
- Tables will sync automatically when you start the backend

**For later (production prep):**
```bash
# Create a migration
npm run typeorm migration:generate -- --name add_paymongo_fields

# Run migrations
npm run typeorm migration:run
```

### Step 5: Start Backend (1 min)

```bash
cd d:\ECOMM-PROJECT\backend
npm run start:dev
```

You should see:
- ✓ Database connected
- ✓ GraphQL playground at http://localhost:3000/graphql
- ✓ PayMongo service initialized

### Step 6: Test Backend GraphQL (2 mins)

1. Go to http://localhost:3000/graphql
2. Try this mutation (after creating an order):

```graphql
mutation {
  initiatePaymongoCheckout(orderId: 1) {
    success
    paymentIntentId
    checkoutUrl
    message
  }
}
```

Expected response:
```json
{
  "data": {
    "initiatePaymongoCheckout": {
      "success": true,
      "paymentIntentId": "pi_xxx...",
      "checkoutUrl": "https://checkout.paymongo.com/...",
      "message": "Checkout session created..."
    }
  }
}
```

### Step 7: Start Frontend (1 min)

```bash
cd d:\ECOMM-PROJECT\frontend
npm run dev
```

Frontend should run at http://localhost:3000

### Step 8: Integration Test (5-10 mins)

#### Test Flow 1: Successful Payment
1. Create an order in your checkout/order creation page
2. Add button to trigger `PaymongoCheckoutModal` component
3. Click "Pay Now"
4. Use PayMongo test card: **4343 4343 4343 4343**
   - Expiry: Any future date (e.g., 12/25)
   - CVC: Any 3 digits (e.g., 123)
5. You should be redirected to `/checkout/success?orderId=X`

#### Test Flow 2: Failed Payment
1. Repeat above, but use card: **4000 0000 0000 0002**
2. You should be redirected to `/checkout/failed?orderId=X`

#### Test Flow 3: Manual Fallback
1. On failed payment page, click "Upload Payment Proof"
2. Verify existing manual upload modal appears as fallback

---

## 📱 Frontend Integration: Usage

### Add PayMongo Button to Your Order/Checkout Page

```tsx
'use client';

import { PaymongoCheckoutModal } from '@/features/checkout';
import { useState } from 'react';

export function OrderDetails({ order }) {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  return (
    <div>
      <h2>Order #{order.orderId}</h2>
      <p>Total: ₱{order.grandTotal}</p>

      {/* Payment Status */}
      {order.paymentStatus !== 'PAID' && (
        <button
          onClick={() => setIsPaymentOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pay with PayMongo
        </button>
      )}

      {/* PayMongo Modal */}
      <PaymongoCheckoutModal
        isOpen={isPaymentOpen}
        orderId={order.orderId}
        orderAmount={order.grandTotal}
        orderNumber={order.orderNumber}
        onClose={() => setIsPaymentOpen(false)}
        onSuccess={() => {
          setIsPaymentOpen(false);
          // Optional: Refresh order details
        }}
      />
    </div>
  );
}
```

### Using the Hook Directly

```tsx
import { usePaymongoCheckout } from '@/features/checkout';

export function CustomPaymentButton() {
  const [initiateCheckout, { loading }] = usePaymongoCheckout();

  const handlePay = async () => {
    const { data } = await initiateCheckout({
      variables: { orderId: 123 },
    });
    
    window.location.href = data.initiatePaymongoCheckout.checkoutUrl;
  };

  return (
    <button onClick={handlePay} disabled={loading}>
      {loading ? 'Processing...' : 'Pay Now'}
    </button>
  );
}
```

---

## 🔒 Security Checklist

- ✅ Secret key stored in `.env` (never commit to git)
- ✅ Public key can be exposed to frontend safely
- ✅ API authentication uses Base64 encoding
- ✅ Order ownership validated before payment (in GraphQL resolver)
- ✅ Payment redirects to PayMongo's hosted checkout (not custom form)
- ✅ Success/failure URLs validated

**⚠️ Before Production:**
1. Get production PayMongo API keys
2. Update `.env` with production keys
3. Change callback URLs to production domain
4. Test thoroughly in staging
5. Enable proper error logging
6. Set `PRODUCTION=true` in `.env`

---

## 🧪 Test Scenarios

### Test Cards (from PayMongo docs)

| Scenario | Card Number | Result |
|----------|------------|--------|
| Success | 4343 4343 4343 4343 | ✅ Payment succeeds |
| Failure | 4000 0000 0000 0002 | ❌ Payment declines |
| Insufficient Funds | 5555 5555 5555 4444 | ❌ Declined |

### Test E-Wallets
1. GCash, PayMaya, Shopee Pay, Grab Pay available in sandbox
2. PayMongo provides test credentials in dashboard

### Manual Payment Proof Fallback
1. If PayMongo payment fails, user can upload proof
2. Existing system still handles manual verification
3. Admin can approve/reject in invoices section

---

## 📊 Database Schema

### orders_tbl (New Fields)

```sql
ALTER TABLE orders_tbl ADD COLUMN (
  paymentIntentId VARCHAR(200) DEFAULT NULL,
  paymentStatus VARCHAR(50) DEFAULT 'UNPAID'
);
```

**Note:** If `DB_SYNC=true`, TypeORM handles this automatically on app start.

---

## 🐛 Troubleshooting

### Backend won't start

**Problem:** `Cannot find module 'axios'`
```bash
npm install axios
npm run build
npm run start:dev
```

### GraphQL mutation not found

**Problem:** `initiatePaymongoCheckout` not in schema
```bash
# Restart backend to regenerate schema
npm run start:dev
# Then visit http://localhost:3000/graphql and refresh
```

### PayMongo API errors

**Problem:** `401 Unauthorized`
- Check `PAYMONGO_SECRET_KEY` is correct
- Ensure no leading/trailing spaces in `.env`

**Problem:** `Invalid amount`
- Amount must be > 0
- Verify `grandTotal` or `totalPrice` is set in order

### Payment redirects to wrong URL

**Problem:** Redirected to success but order not marked as paid
- PayMongo redirects immediately, invoice update pending
- Backend will mark as PAID when payment is captured
- Check order.paymentStatus in database

---

## 📝 Environment Variables Reference

```bash
# PayMongo Configuration
PAYMONGO_PUBLIC_KEY=pk_test_xxx          # Test: pk_test_*, Prod: pk_live_*
PAYMONGO_SECRET_KEY=sk_test_xxx          # Test: sk_test_*, Prod: sk_live_*
PAYMONGO_API_URL=https://api.paymongo.com/v1

# Callback URLs (Adjust for your domain)
PAYMONGO_CHECKOUT_SUCCESS_URL=http://localhost:3000/checkout/success
PAYMONGO_CHECKOUT_FAILED_URL=http://localhost:3000/checkout/failed
```

---

## 🎯 Next Features (Future)

1. **Webhooks** - Real-time payment confirmation (instead of redirects)
2. **Refunds** - Full/partial refund support
3. **Payment History** - Track all PayMongo transactions
4. **Invoice Auto-Payment** - Pay existing invoices directly
5. **Multi-Currency** - Support other currencies
6. **Payment Analytics** - Dashboard with payment metrics

---

## 📞 Support

**PayMongo Documentation:** https://developers.paymongo.com
**Your Test Keys:** https://dashboard.paymongo.com/developers/api-keys

---

## ✨ Summary

Your PayMongo integration is complete and ready to test! Follow the setup steps above, and you'll have a fully functional online payment system integrated with your existing manual payment fallback. The hybrid approach ensures flexibility for both online and offline payment scenarios.

Happy coding! 🚀
