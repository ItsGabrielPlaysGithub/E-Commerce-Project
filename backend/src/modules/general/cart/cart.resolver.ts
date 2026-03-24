import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../general/auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';
import { CartItem, AddToCartInput, UpdateCartItemInput, CartResponse } from './cart.entity';
import { ProductsTbl } from '../../admin/products/entity/products.tbl';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => CartItem)
export class CartResolver {
  constructor(
    private readonly cartService: CartService,
    @InjectRepository(ProductsTbl)
    private readonly productRepository: Repository<ProductsTbl>,
  ) {}

  @ResolveField(() => ProductsTbl, { nullable: true })
  async product(@Parent() cartItem: CartItem & { product?: ProductsTbl }) {
    if (cartItem.product) {
      return cartItem.product;
    }
    return await this.productRepository.findOne({
      where: { productId: cartItem.productId },
      relations: ['category'],
    });
  }

  @Query(() => CartResponse)
  @UseGuards(JwtAuthGuard)
  async getCart(@Context() context: any) {
    try {
      const userId = context.req?.user?.userId || context.user?.userId;
      if (!userId) throw new Error('Unauthorized: User ID not found in request');
      return await this.cartService.getCart(userId);
    } catch (error) {
      console.error('[CartResolver] getCart error:', error);
      throw error;
    }
  }

  @Mutation(() => CartItem)
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Context() context: any,
    @Args('input', { type: () => AddToCartInput }) input: AddToCartInput,
  ) {
    try {
      const userId = context.req?.user?.userId || context.user?.userId;
      if (!userId) throw new Error('Unauthorized: User ID not found in request');
      return await this.cartService.addToCart(userId, input);
    } catch (error: any) {
      console.error('[CartResolver] addToCart error:', {
        message: error?.message,
        status: error?.status,
        response: error?.response,
        fullError: error,
      });
      throw error;
    }
  }

  @Mutation(() => CartItem)
  @UseGuards(JwtAuthGuard)
  async updateCartItem(
    @Context() context: any,
    @Args('input', { type: () => UpdateCartItemInput }) input: UpdateCartItemInput,
  ) {
    try {
      const userId = context.req?.user?.userId || context.user?.userId;
      if (!userId) throw new Error('Unauthorized: User ID not found in request');
      return await this.cartService.updateCartItem(userId, input);
    } catch (error) {
      console.error('[CartResolver] updateCartItem error:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeFromCart(
    @Context() context: any,
    @Args('itemId', { type: () => Int }) itemId: number,
  ) {
    try {
      const userId = context.req?.user?.userId || context.user?.userId;
      if (!userId) throw new Error('Unauthorized: User ID not found in request');
      await this.cartService.removeFromCart(userId, itemId);
      return true;
    } catch (error) {
      console.error('[CartResolver] removeFromCart error:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async clearCart(@Context() context: any) {
    try {
      const userId = context.req?.user?.userId || context.user?.userId;
      if (!userId) throw new Error('Unauthorized: User ID not found in request');
      await this.cartService.clearCart(userId);
      return true;
    } catch (error) {
      console.error('[CartResolver] clearCart error:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeCartItemByProductId(
    @Context() context: any,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    try {
      const userId = context.req?.user?.userId || context.user?.userId;
      if (!userId) throw new Error('Unauthorized: User ID not found in request');
      await this.cartService.removeByProductId(userId, productId);
      return true;
    } catch (error) {
      console.error('[CartResolver] removeCartItemByProductId error:', error);
      throw error;
    }
  }
}
