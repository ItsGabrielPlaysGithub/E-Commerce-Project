import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import type { Multer } from 'multer';

// Configure storage for uploaded product images
const storage = diskStorage({
  destination: (req, file, cb) => {
    // Files will be saved in 'uploads/products' directory
    cb(null, 'uploads/products');
  },
  filename: (req, file, cb) => {
    // Generate filename: timestamp-random.extension
    const randomName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${randomName}${extname(file.originalname)}`);
  },
});

// File filter - only allow image types
const fileFilter = (req: any, file: Multer.File, cb: any) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(
        `Invalid file type. Allowed types: JPEG, PNG, WebP`,
      ),
      false,
    );
  }
};

@Controller('products')
export class ProductImageController {
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  )
  async uploadProductImage(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    try {
      // Return the image URL path
      const imageUrl = `/uploads/products/${file.filename}`;

      return {
        success: true,
        message: 'Product image uploaded successfully',
        imageUrl,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        uploadedAt: new Date(),
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to save product image',
      );
    }
  }
}
