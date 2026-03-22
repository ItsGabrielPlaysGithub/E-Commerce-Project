import { Int, Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { OrdersTbl } from './entity/orders.tbl';
import { CreateOrderDto } from './dto/create.order';
import { UpdateOrderDto } from './dto/update.order';
import { TransitionOrderStatusDto } from './dto/transition.order-status';
import { RejectPaymentProofDto } from './dto/reject-payment-proof';
import { PlaceOrderDto } from './dto/place-order';
import { PlaceOrderResponse } from './entity/place-order-response';

@Resolver()
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService){}

    // ADMIN SIDE ORDER FUNCTIONS

    // for admin to view all orders
    @Query(() => [OrdersTbl], { name: 'allOrders' })
    async allOrders(){
        return await this.ordersService.allOrders();
    }

    @Query(() => OrdersTbl, { name: 'orderDetails' })
    async orderDetails(@Args('orderId', { type: () => Int }) orderId: number){
        return await this.ordersService.orderDetails(orderId);
    }

    // CLIENTS SIDE ORDER FUNCTIONS
    // for clients to view their own orders
    @Query(() => [OrdersTbl], { name: 'clientOrders' })
    async clientOrders(@Args('userId', { type: () => Int }) userId: number){
        return await this.ordersService.clientOrders(userId);
    }

    @Mutation(() => OrdersTbl, { name: 'createOrder' })
    async createOrder(@Args('input') createOrderDto: CreateOrderDto){
        return await this.ordersService.createOrder(createOrderDto);
    }

    @Mutation(() => OrdersTbl, { name: 'updateOrder' })
    async updateOrder(@Args('input') updateOrderDto: UpdateOrderDto){
        return await this.ordersService.updateOrder(updateOrderDto);
    }

    @Mutation(() => OrdersTbl, { name: 'transitionOrderStatus' })
    async transitionOrderStatus(@Args('input') input: TransitionOrderStatusDto) {
        return await this.ordersService.transitionOrderStatus(input);
    }

    @Mutation(() => OrdersTbl, { name: 'rejectPaymentProof' })
    async rejectPaymentProof(@Args('input') input: RejectPaymentProofDto) {
        return await this.ordersService.rejectPaymentProof(input.orderId, input.rejectionReason);
    }

    @Mutation(() => OrdersTbl, { name: 'approvePaymentProof' })
    async approvePaymentProof(@Args('orderId', { type: () => Int }) orderId: number) {
        return await this.ordersService.approvePaymentProof(orderId);
    }

    @Mutation(() => PlaceOrderResponse, { name: 'placeOrder' })
    async placeOrder(@Args('input') placeOrderDto: PlaceOrderDto) {
        return await this.ordersService.placeOrder(placeOrderDto);
    }
}
