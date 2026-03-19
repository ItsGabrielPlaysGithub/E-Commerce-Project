# Payment Proof Upload Implementation Guide

## Overview

The payment proof upload feature allows customers to submit proof of payment for their orders. When a payment proof is received, the order automatically transitions from "READY_FOR_BILLING" to "PAID" status.

## Backend Setup

### 1. **Install Required Dependencies**

Make sure you have `@nestjs/platform-express` installed for file upload handling:

```bash
cd backend
npm install @nestjs/platform-express
```

### 2. **New Backend Files Created**

- **`src/modules/admin/orders/payment-proof.controller.ts`** - Handles the HTTP file upload endpoint
- **Updated `src/modules/admin/orders/orders.service.ts`** - Added `savePaymentProof()` method
- **Updated `src/modules/admin/orders/orders.module.ts`** - Registered the PaymentProofController

### 3. **File Storage Configuration**

Files are stored at: `uploads/payment-proofs/`

The directory structure:
```
backend/
├── uploads/
│   └── payment-proofs/        (files stored here)
│       └── .gitkeep
├── src/
├── .gitignore                 (ignores the uploads folder)
└── ...
```

## Running the Backend

### Start the Development Server

```bash
cd backend
npm run start:dev
```

The server runs on `http://localhost:3000` by default.

### Verify the Endpoint

You can test the endpoint with a curl command:

```bash
curl -X POST \
  -F "file=@/path/to/payment-proof.pdf" \
  http://localhost:3000/orders/upload-payment-proof/1
```

Replace:
- `/path/to/payment-proof.pdf` with your test file
- `1` with an actual order ID from your database

## API Endpoint

### Upload Payment Proof

**Endpoint:** `POST /orders/upload-payment-proof/:orderId`

**Parameters:**
- `orderId` (path) - The order ID from your database
- `file` (form-data) - The payment proof file

**Accepted File Types:**
- `image/jpeg` (.jpg, .jpeg)
- `image/png` (.png)
- `image/webp` (.webp)
- `application/pdf` (.pdf)

**File Size Limit:** 4MB

**Response:**
```json
{
  "success": true,
  "message": "Payment proof uploaded successfully",
  "orderId": 1,
  "filename": "1708234567890-123456789.pdf",
  "originalName": "payment-proof.pdf",
  "size": 250000,
  "uploadedAt": "2026-03-19T10:30:00.000Z"
}
```

## What Happens When Payment Proof is Uploaded

1. **File Validation**
   - Checks file MIME type (only allowed types)
   - Validates file size (max 4MB)
   - Generates unique filename with timestamp

2. **Database Update**
   - Stores filename in `orders_tbl.paymentProofImage`
   - Records upload timestamp in `orders_tbl.paymentProofUploadedAt`
   - Transitions order status from `READY_FOR_BILLING` → `PAID`

3. **Notification Email**
   - Sends email to customer confirming payment proof receipt
   - Includes invoice details if available
   - Shows next steps in order processing

4. **Order Processing Continues**
   - Frontend refetches orders to show updated status
   - Order moves to "Processing" stage
   - Items ready for dispatch

## Frontend Integration

The frontend uploads files via the `OrderRow` component:

```typescript
const response = await fetch(
  `http://localhost:4000/orders/upload-payment-proof/${orderId}`,
  {
    method: "POST",
    body: formData,  // Contains the file
  }
);
```

## Common Issues & Troubleshooting

### Issue: "ENOENT: no such file or directory" for uploads folder

**Solution:** Create the uploads directory manually:
```bash
mkdir -p uploads/payment-proofs
```

### Issue: "Failed to upload payment proof"

**Solutions:**
1. Check backend is running on port 3000
2. Verify file is within 4MB limit
3. Check file type is one of: JPEG, PNG, WebP, PDF
4. Check order ID exists in database

### Issue: CORS Error on Frontend

**Solution:** The backend needs CORS enabled. Check your main.ts or AppModule for CORS configuration. Update if needed:

```typescript
app.enableCors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true,
});
```

## Testing the Feature

1. Start backend: `npm run start:dev`
2. Start frontend: `npm run dev`
3. Go to Orders page
4. Click upload button on an "Open" order with "Pending" payment
5. Select a file (must be ≤4MB: JPEG, PNG, WebP, or PDF)
6. Click Upload
7. Check console for success message
8. Order should move to "Processing" section

## Future Enhancements

- [ ] Add file preview for images before upload
- [ ] Implement payment verification workflow
- [ ] Add ability to download stored payment proofs (admin)
- [ ] Add payment proof status tracking
- [ ] Implement webhook for automatic payment verification
- [ ] Add S3 bucket storage option for production

## Database Schema

The `orders_tbl` entity has these fields for payment proofs:

```typescript
@Column({ type: 'text', nullable: true })
paymentProofImage?: string;  // Stores filename

@Column({ type: 'timestamp', nullable: true })
paymentProofUploadedAt?: Date;  // Upload timestamp
```

These fields are already in your database schema and ready to use.
