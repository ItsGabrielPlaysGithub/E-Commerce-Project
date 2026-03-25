import { Int, Query, Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../../general/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../general/auth/guards/roles.guard';
import { OrdersService } from './orders.service';
import { OrdersTbl } from './entity/orders.tbl';
import { CreateOrderDto } from './dto/create.order';
import { UpdateOrderDto } from './dto/update.order';
import { TransitionOrderStatusDto } from './dto/transition.order-status';
import { RejectPaymentProofDto } from './dto/reject-payment-proof';
import { CancelOrderDto } from './dto/cancel-order';
import { PlaceOrderDto } from './dto/place-order';
import { PlaceOrderResponse } from './entity/place-order-response';

@Resolver()
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService){}

    // ADMIN SIDE ORDER FUNCTIONS

    // for admin to view all orders - ADMIN ONLY
    @Query(() => [OrdersTbl], { name: 'allOrders' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async allOrders(){
        return await this.ordersService.allOrders();
    }

    @Query(() => OrdersTbl, { name: 'orderDetails' })
    @UseGuards(JwtAuthGuard)
    async orderDetails(
        @Args('orderId', { type: () => Int }) orderId: number,
        @Context() context: any
    ){
        const userId = context.req?.user?.userId || context.user?.userId;
        const userRole = context.req?.user?.role || context.user?.role;
        
        if (!userId) throw new ForbiddenException('Not authenticated');
        
        // Fetch the order to check ownership
        const order = await this.ordersService.orderDetails(orderId);
        if (!order) throw new Error('Order not found');
        
        // Allow access if user owns the order OR is an admin
        if (order.userId !== userId && userRole !== 'admin') {
            throw new ForbiddenException('You can only view your own orders');
        }
        
        return order;
    }

    // CLIENTS SIDE ORDER FUNCTIONS
    // for clients to view their own orders
    @Query(() => [OrdersTbl], { name: 'clientOrders' })
    @UseGuards(JwtAuthGuard)
    async clientOrders(@Context() context: any){
        const userId = context.req?.user?.userId || context.user?.userId;
        if (!userId) throw new Error('Unauthorized: User ID not found in request');
        return await this.ordersService.clientOrders(userId);
    }

    @Mutation(() => OrdersTbl, { name: 'createOrder' })
    @UseGuards(JwtAuthGuard)
    async createOrder(
        @Args('input') createOrderDto: CreateOrderDto,
        @Context() context: any
    ){
        const userId = context.req?.user?.userId || context.user?.userId;
        if (!userId) throw new ForbiddenException('Not authenticated');
        return await this.ordersService.createOrder(createOrderDto);
    }

    @Mutation(() => OrdersTbl, { name: 'updateOrder' })
    @UseGuards(JwtAuthGuard)
    async updateOrder(
        @Args('input') updateOrderDto: UpdateOrderDto,
        @Context() context: any
    ){
        const userId = context.req?.user?.userId || context.user?.userId;
        if (!userId) throw new ForbiddenException('Not authenticated');
        return await this.ordersService.updateOrder(updateOrderDto);
    }

    @Mutation(() => OrdersTbl, { name: 'transitionOrderStatus' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async transitionOrderStatus(@Args('input') input: TransitionOrderStatusDto) {
        return await this.ordersService.transitionOrderStatus(input);
    }

    @Mutation(() => OrdersTbl, { name: 'rejectPaymentProof' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async rejectPaymentProof(@Args('input') input: RejectPaymentProofDto) {
        return await this.ordersService.rejectPaymentProof(input.orderId, input.rejectionReason);
    }

    @Mutation(() => OrdersTbl, { name: 'approvePaymentProof' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async approvePaymentProof(@Args('orderId', { type: () => Int }) orderId: number) {
        return await this.ordersService.approvePaymentProof(orderId);
    }

    @Mutation(() => OrdersTbl, { name: 'cancelOrder' })
    @UseGuards(JwtAuthGuard)
    async cancelOrder(
        @Args('input') input: CancelOrderDto,
        @Context() context: any
    ) {
        const userId = context.req?.user?.userId || context.user?.userId;
        if (!userId) throw new ForbiddenException('Not authenticated');
        return await this.ordersService.cancelOrder(input.orderId, userId);
    }

    @Mutation(() => PlaceOrderResponse, { name: 'placeOrder' })
    @UseGuards(JwtAuthGuard)
    async placeOrder(@Args('input') placeOrderDto: PlaceOrderDto, @Context() context: any) {
        const userId = context.req?.user?.userId || context.user?.userId;
        if (!userId) throw new ForbiddenException('Not authenticated');
        
        // Create a new DTO with userId from authenticated context (never trust client)
        const orderInput = {
            ...placeOrderDto,
            userId: userId, // Override with authenticated user's ID
        };
        
        return await this.ordersService.placeOrder(orderInput);
    }
}
