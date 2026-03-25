import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import {
  CartItem,
  AddToCartInput,
  UpdateCartItemInput,
  CartResponse,
} from './cart.entity';
import { ProductsTbl } from '../../admin/products/entity/products.tbl';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    @InjectRepository(ProductsTbl)
    private readonly productRepository: Repository<ProductsTbl>,
  ) {}

  // Helper method to get cart item with product details
  private async getCartItemWithProduct(id: number): Promise<any> {
    const item = await this.cartRepository.findOne({ where: { id } });
    if (!item) return null;

    const product = await this.productRepository.findOne({
      where: { productId: item.productId },
      relations: ['category'],
    });

    return {
      ...item,
      product,
    };
  }

  async getCart(userId: number): Promise<CartResponse> {
    const items = await this.cartRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    // Manually load product details for each cart item
    const itemsWithProducts = await Promise.all(
      items.map(async (item) => {
        const product = await this.productRepository.findOne({
          where: { productId: item.productId },
          relations: ['category'],
        });
        return {
          ...item,
          product,
        } as any;
      }),
    );

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * parseFloat(String(item.unitPrice)),
      0,
    );

    return {
      items: itemsWithProducts,
      totalItems,
      totalPrice,
    };
  }

  async addToCart(userId: number, input: AddToCartInput): Promise<CartItem> {
    try {
      console.log('[CartService.addToCart] Starting add to cart', {
        userId,
        productId: input.productId,
        quantity: input.quantity,
      });

      // Check if product exists and use its authoritative price from database
      const product = await this.productRepository.findOne({
        where: { productId: input.productId },
      });

      if (!product) {
        throw new BadRequestException(
          `Product with ID ${input.productId} not found`,
        );
      }

      // Use product's authoritative price from database, never from client input
      const unitPrice = product.productPrice;

      // Check if item already exists with same product and options
      const where: any = {
        userId,
        productId: input.productId,
      };

      if (input.selectedColor) {
        where.selectedColor = input.selectedColor;
      } else {
        where.selectedColor = IsNull();
      }

      if (input.selectedSize) {
        where.selectedSize = input.selectedSize;
      } else {
        where.selectedSize = IsNull();
      }

      const exists = await this.cartRepository.findOne({ where });

      if (exists) {
        // Update quantity if item already in cart
        exists.quantity += input.quantity;
        const saved = await this.cartRepository.save(exists);
        const updated = await this.getCartItemWithProduct(saved.id);
        if (!updated) {
          throw new NotFoundException('Failed to retrieve updated cart item');
        }
        return updated;
      }

      // Add new item
      const cartItem = this.cartRepository.create({
        userId,
        productId: input.productId,
        quantity: input.quantity,
        unitPrice: unitPrice,
        selectedColor: input.selectedColor,
        selectedSize: input.selectedSize,
      });

      const saved = await this.cartRepository.save(cartItem);

      const created = await this.getCartItemWithProduct(saved.id);
      if (!created) {
        throw new NotFoundException('Failed to retrieve created cart item');
      }
      console.log('[CartService.addToCart] Successfully added item', {
        id: created.id,
        productId: input.productId,
      });
      return created;
    } catch (error: any) {
      console.error('[CartService.addToCart] Error:', {
        message: error?.message,
        status: error?.status,
        response: error?.response,
        type: error?.constructor?.name,
      });
      throw error;
    }
  }

  async updateCartItem(
    userId: number,
    input: UpdateCartItemInput,
  ): Promise<CartItem> {
    const item = await this.cartRepository.findOne({
      where: { id: input.id, userId },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    if (input.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    item.quantity = input.quantity;
    const saved = await this.cartRepository.save(item);
    const updated = await this.getCartItemWithProduct(saved.id);
    if (!updated) {
      throw new NotFoundException('Failed to retrieve updated cart item');
    }
    return updated;
  }

  async removeFromCart(userId: number, itemId: number): Promise<void> {
    const result = await this.cartRepository.delete({
      id: itemId,
      userId,
    });

    if (result.affected === 0) {
      throw new NotFoundException('Cart item not found');
    }
  }

  async clearCart(userId: number): Promise<void> {
    await this.cartRepository.delete({ userId });
  }

  async removeByProductId(userId: number, productId: number): Promise<void> {
    await this.cartRepository.delete({ userId, productId });
  }
}
