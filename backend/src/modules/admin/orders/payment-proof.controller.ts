import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Multer } from 'multer';
import { OrdersService } from './orders.service';

// Configure storage for uploaded files
const storage = diskStorage({
  destination: (req, file, cb) => {
    // Files will be saved in 'uploads/payment-proofs' directory
    cb(null, 'uploads/payment-proofs');
  },
  filename: (req, file, cb) => {
    // Generate filename: orderId-timestamp.extension
    const randomName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

// File filter - only allow specific MIME types
const fileFilter = (req: any, file: Multer.File, cb: any) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(
        `Invalid file type. Allowed types: JPEG, PNG, WebP, PDF`,
      ),
      false,
    );
  }
};

@Controller('orders')
export class PaymentProofController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('upload-payment-proof/:orderId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter,
      limits: {
        fileSize: 4 * 1024 * 1024, // 4MB limit
      },
    }),
  )
  async uploadPaymentProof(
    @Param('orderId', ParseIntPipe) orderId: number,
    @UploadedFile() file: Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      // Save the file path to the database and update order status
      const result = await this.ordersService.savePaymentProof(
        orderId,
        file.filename,
      );

      return {
        success: true,
        message: 'Payment proof uploaded successfully',
        orderId,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        uploadedAt: new Date(),
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to save payment proof',
      );
    }
  }
}
