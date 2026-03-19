# Payment Proof Upload - Quick Start Guide

## What Was Implemented

✅ **Backend:**
- `POST /orders/upload-payment-proof/:orderId` - REST endpoint for file uploads
- Automatic database updates storing file metadata
- File validation (type & size)
- Order status transition: READY_FOR_BILLING → PAID
- Email notification to customer

✅ **Frontend:**
- Modal component with drag-and-drop support
- File preview before upload
- Automatic order refresh after successful upload
- Error handling and user feedback

## How to Run

### 1. Install Dependencies (First Time Only)

```bash
cd backend
npm install @nestjs/platform-express
```

### 2. Start Backend

```bash
cd backend
npm run start:dev
```

Expected output:
```
[Nest] 12345  - 03/19/2026, 10:00:00 AM     LOG [NestFactory] Starting Nest application...
[Nest] 12345  - 03/19/2026, 10:00:00 AM     LOG [InstanceLoader] TypeOrmModule dependencies initialized
...
[Nest] 12345  - 03/19/2026, 10:00:00 AM     LOG [NestApplication] Nest application successfully started +150ms
```

### 3. Start Frontend (in another terminal)

```bash
cd frontend
npm run dev
```

### 4. Test the Feature

1. Navigate to Orders page
2. Find an order with status "Open" and payment status "Pending"
3. Click the Upload button (📤 icon)
4. Select a file (JPEG, PNG, WebP, or PDF, max 4MB)
5. Click "Upload"
6. Success! Order moves to "Processing"

## File Directory Structure

```
backend/
├── uploads/
│   └── payment-proofs/
│       ├── .gitkeep
│       └── [0-1708234567890-123456789.pdf]  (generated files)
├── src/
│   ├── modules/admin/orders/
│   │   ├── payment-proof.controller.ts  🆕 NEW
│   │   ├── orders.service.ts            ✏️ MODIFIED
│   │   └── orders.module.ts             ✏️ MODIFIED
│   └── ...
└── PAYMENT_PROOF_SETUP.md               🆕 NEW (detailed docs)
```

## Features

### ✅ File Validation
- Type: JPEG, PNG, WebP, PDF
- Size: Max 4MB
- Real-time validation messages

### ✅ Automatic Updates
- File stored with unique timestamp filename
- Database updated with file path & upload time
- Order status transitions to PAID
- Customer notified via email

### ✅ Error Handling
- Invalid file types rejected
- File size exceeded error
- Upload failures logged
- User-friendly error messages

## API Endpoint Details

**URL:** `POST http://localhost:4000/orders/upload-payment-proof/:orderId`

**Body:** form-data with key `file`

**Example cURL:**
```bash
curl -X POST \
  -F "file=@/path/to/payment-proof.pdf" \
  http://localhost:4000/orders/upload-payment-proof/1
```

**Success Response (200 OK):**
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

**Error Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "Invalid file type. Allowed types: JPEG, PNG, WebP, PDF",
  "error": "Bad Request"
}
```

## Database Changes

No schema changes needed! The `orders_tbl` entity already has:
- `paymentProofImage` - stores filename
- `paymentProofUploadedAt` - stores upload timestamp

## Next Steps (Optional Enhancements)

- [ ] Add image preview on view orders page
- [ ] Implement manual payment verification workflow for admins
- [ ] Add download button for stored payment proofs
- [ ] Track payment proof status (pending, verified, rejected)
- [ ] Setup webhook for automatic bank reconciliation
- [ ] Migrate to cloud storage (AWS S3, Firebase, etc.)

## Troubleshooting

### Backend won't start
```
Error: ENOENT: no such file or directory, open 'uploads/payment-proofs'
```
**Fix:** Create the directory manually
```bash
mkdir -p uploads/payment-proofs
```

### Can't upload file
```
Failed to upload payment proof
```
**Debug:** Check:
1. Backend running on localhost:3000
2. File is < 4MB
3. File type is JPEG, PNG, WebP, or PDF
4. Order ID exists in database
5. Backend logs for detailed error

### CORS Error
**Fix:** Ensure AppModule has CORS enabled (usually auto-enabled in dev)

## Summary

Payment proof uploads are now fully functional! Users can:
1. Upload payment proof files directly from the Orders page
2. Get instant feedback with preview and validation
3. See orders automatically transition to "Processing"
4. Receive confirmation emails

The system is production-ready for basic payment proof submission. For production deployment, consider adding cloud storage and payment reconciliation features.
