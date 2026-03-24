# PayMongo Modal Not Opening - Debugging Guide

## Problem
Order creates successfully (green toast appears) but PayMongo checkout modal doesn't display. Instead, the order confirmation modal stays on screen.

## Root Cause (Identified)
The modal state (`isPaymongoOpen`) is not being triggered automatically when the order is created and `orderId` becomes available. We've added a `useEffect` hook to fix this, but need to verify it's working correctly.

## Adding Debug Logging

We've added comprehensive console logging to help identify the issue. Here's what to do:

### Step 1: Open Browser DevTools Console
1. In your browser, press `F12` or right-click → Inspect
2. Go to the **Console** tab
3. Keep it open while testing

### Step 2: Test the Flow
1. In your B2B cart, select items 
2. Click the **Confirm Order** button
3. Select **"E-Payment (PayMongo)"** as the payment method
4. Click the **Confirm** checkbox
5. Click **"Place Order"** button

### Step 3: Watch the Console Logs

You should see logs in this order:

#### A. Order Placement Logs (from `useOrderPlacement.ts`)
```
[useOrderPlacement] Order placed successfully: {
  orderId: 123,
  orderNumber: "B2B-20250101-001",
  paymentMethod: "e-payment"
}
[useOrderPlacement] E-payment selected - waiting for PayMongo modal to open
```

**If you DON'T see these logs:**
- The order mutation failed or is not being called
- Check the Network tab for the GraphQL mutation response

#### B. OrderConfirmModal Logs (from `OrderConfirmModal.tsx`)
```
[OrderConfirmModal] Props updated: {
  isOpen: true,
  orderId: 123,
  orderNumber: "B2B-20250101-001",
  paymentMethod: "e-payment",
  isPaymongoOpen: false
}
[OrderConfirmModal] useEffect triggered. Checking conditions: {
  orderId: true,
  isPepayment: true,
  isPaymongoOpenFalse: true
}
[OrderConfirmModal] ✅ All conditions met. Opening PayMongo modal. orderId: 123
```

**If you DON'T see these logs:**
- The props are not being passed from parent to child
- Check the Redux/State management in cartPage

**If you see the "Checking conditions" logs but they're false:**
- `orderId: false` → orderId is not being passed or is undefined
- `isPepayment: false` → paymentMethod is not "e-payment", check PaymentMethod selector
- `isPaymongoOpenFalse: false` → modal already open (shouldn't happen on first run)

#### C. PaymongoCheckoutModal Logs (from `PaymongoCheckoutModal.tsx`)
```
[PaymongoCheckoutModal] Rendered with props: {
  isOpen: true,
  orderId: 123,
  orderAmount: 1500.50,
  orderNumber: "B2B-20250101-001"
}
[PaymongoCheckoutModal] Modal is open, rendering payment form
```

**If you see:**
```
[PaymongoCheckoutModal] Modal is closed (isOpen=false), not rendering
```
- The `isPaymongoOpen` state was never set to true
- The useEffect in OrderConfirmModal is not firing

**If you DON'T see PaymongoCheckoutModal logs at all:**
- The modal component is not rendering
- Check if it's being imported correctly in OrderConfirmModal

#### D. When You Click "Pay Now"
```
[PaymongoCheckoutModal] Pay button clicked, initiating checkout for orderId: 123
```

Then the GraphQL mutation should be called (check Network tab).

## Expected Network Requests

In the **Network** tab, you should see:

1. **GraphQL Query**: `placeOrder` mutation
   - Response should include `orderId` and `orderNumber`
   - Status: 200 OK

2. **GraphQL Query**: `initiatePaymongoCheckout` mutation (when you click "Pay Now")
   - Response should include `checkoutUrl`
   - Status: 200 OK

3. **Redirect**: You'll be redirected to PayMongo's hosted checkout page
   - URL should start with `https://api.paymongo.com/` or similar

## Troubleshooting Checklist

### ✅ If everything works
- PayMongo modal displays
- "Pay Now" button is visible and clickable
- Clicking it redirects to PayMongo
- Console shows all expected logs

### ❌ If order placement logs don't appear
1. Check that `onPlaceOrder` is connected to ModalFooter button
2. Verify payment method is selected ("E-Payment (PayMongo)")
3. Check GraphQL query in Network tab for errors
4. Look for red error messages in console

### ❌ If OrderConfirmModal logs don't appear
1. Check that `cartPage` passes `orderId` to `OrderConfirmModal`
2. Verify `useCartLogic` returns `orderId`
3. Check if other modals are blocking the view

### ❌ If OrderConfirmModal methods check returns false for conditions
```javascript
// orderId is undefined
"orderId: false"  → Add logging in cartPage to check if orderId is passed

// paymentMethod is wrong
"isPepayment: false"  → Verify choice in PaymentMethod component

// Modal already open
"isPaymongoOpenFalse: false"  → Check if state isn't resetting properly
```

### ❌ If PaymongoCheckoutModal logs don't appear
1. Verify modal is imported in OrderConfirmModal
2. Check that `isOpen={isPaymongoOpen}` is correct
3. Make sure the conditional rendering `{orderId && <PaymongoCheckoutModal ... />}` is working

## Files We Modified for Debugging

1. **`backend/src/features/b2b/cart/hooks/useOrderPlacement.ts`**
   - Added console.log for order placement success
   - Added logging before e-payment vs manual_transfer branch

2. **`frontend/src/features/b2b/cart/components/OrderConfirmModal.tsx`**
   - Added useEffect to log all prop changes
   - Added console.log in main useEffect to check conditions before opening modal
   - Added detailed condition checking logs

3. **`frontend/src/features/checkout/PaymongoCheckoutModal.tsx`**
   - Added console.log on render
   - Added logging when modal is open/closed
   - Added logging when "Pay Now" is clicked

## After Debugging

Once you identify the issue from the logs:
1. Let me know what logs you see (or don't see)
2. I'll identify the root cause
3. We'll implement the appropriate fix

**Key things to report:**
- Which logs appear vs don't appear
- Any error messages in red in the console
- Network request failures (check Network tab)
- The actual values in the logs if they appear
