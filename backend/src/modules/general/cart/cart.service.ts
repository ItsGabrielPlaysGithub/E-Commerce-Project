import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CartItem, AddToCartInput, UpdateCartItemInput, CartResponse } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
  ) {}

  async getCart(userId: number): Promise<CartResponse> {
    const items = await this.cartRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * parseFloat(String(item.unitPrice)), 0);

    return {
      items,
      totalItems,
      totalPrice,
    };
  }

  async addToCart(userId: number, input: AddToCartInput): Promise<CartItem> {
    // Check if item already exists with same product and options
    const where: any = {
      userId,
      productId: input.productId,
    };

    // Handle null values for optional fields
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
      return await this.cartRepository.save(exists);
    }

    // Add new item
    const cartItem = this.cartRepository.create({
      userId,
      productId: input.productId,
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      selectedColor: input.selectedColor,
      selectedSize: input.selectedSize,
    });

    return await this.cartRepository.save(cartItem);
  }

  async updateCartItem(userId: number, input: UpdateCartItemInput): Promise<CartItem> {
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
    return await this.cartRepository.save(item);
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
