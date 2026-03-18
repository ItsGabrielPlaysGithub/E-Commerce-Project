import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CartItem, AddToCartInput, UpdateCartItemInput, CartResponse } from './cart.entity';

@Resolver(() => CartItem)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => CartResponse)
  async getCart(@Args('userId', { type: () => Int }) userId: number) {
    return await this.cartService.getCart(userId);
  }

  @Mutation(() => CartItem)
  async addToCart(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('input') input: AddToCartInput,
  ) {
    return await this.cartService.addToCart(userId, input);
  }

  @Mutation(() => CartItem)
  async updateCartItem(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('input') input: UpdateCartItemInput,
  ) {
    return await this.cartService.updateCartItem(userId, input);
  }

  @Mutation(() => Boolean)
  async removeFromCart(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('itemId', { type: () => Int }) itemId: number,
  ) {
    await this.cartService.removeFromCart(userId, itemId);
    return true;
  }

  @Mutation(() => Boolean)
  async clearCart(@Args('userId', { type: () => Int }) userId: number) {
    await this.cartService.clearCart(userId);
    return true;
  }

  @Mutation(() => Boolean)
  async removeCartItemByProductId(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('productId', { type: () => Int }) productId: number,
  ) {
    await this.cartService.removeByProductId(userId, productId);
    return true;
  }
}
