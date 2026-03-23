import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
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
  async getCart(@Args('userId', { type: () => Int }) userId: number) {
    try {
      return await this.cartService.getCart(userId);
    } catch (error) {
      console.error('[CartResolver] getCart error:', error);
      throw error;
    }
  }

  @Mutation(() => CartItem)
  async addToCart(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('input', { type: () => AddToCartInput }) input: AddToCartInput,
  ) {
    try {
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
  async updateCartItem(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('input', { type: () => UpdateCartItemInput }) input: UpdateCartItemInput,
  ) {
    try {
      return await this.cartService.updateCartItem(userId, input);
    } catch (error) {
      console.error('[CartResolver] updateCartItem error:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async removeFromCart(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('itemId', { type: () => Int }) itemId: number,
  ) {
    try {
      await this.cartService.removeFromCart(userId, itemId);
      return true;
    } catch (error) {
      console.error('[CartResolver] removeFromCart error:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async clearCart(@Args('userId', { type: () => Int }) userId: number) {
    try {
      await this.cartService.clearCart(userId);
      return true;
    } catch (error) {
      console.error('[CartResolver] clearCart error:', error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async removeCartItemByProductId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    try {
      await this.cartService.removeByProductId(userId, productId);
      return true;
    } catch (error) {
      console.error('[CartResolver] removeCartItemByProductId error:', error);
      throw error;
    }
  }
}
