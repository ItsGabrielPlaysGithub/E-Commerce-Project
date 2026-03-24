import { Args, Int, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../../general/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../general/auth/guards/roles.guard';
import { InvoicesService } from './invoices.service';
import { InvoicesTbl } from './entity/invoices.tbl';
import { OrdersService } from '../orders/orders.service';

@Resolver(() => InvoicesTbl)
export class InvoicesResolver {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly ordersService: OrdersService,
  ) {}

  @Query(() => [InvoicesTbl], { name: 'allInvoices' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async allInvoices() {
    return this.invoicesService.getAllInvoices();
  }

  @Query(() => InvoicesTbl, { name: 'invoiceByOrderId', nullable: true })
  @UseGuards(JwtAuthGuard)
  async invoiceByOrderId(
    @Args('orderId', { type: () => Int }) orderId: number,
    @Context() context: any,
  ) {
    const userId = context.req?.user?.userId || context.user?.userId;
    const userRole = context.req?.user?.role || context.user?.role;

    // Users can only see their own invoices unless they're admin
    if (userRole !== 'admin') {
      const order = await this.ordersService.orderDetails(orderId);
      if (!order || order.userId !== userId) {
        throw new ForbiddenException('You do not have permission to view this invoice');
      }
    }

    return this.invoicesService.getInvoiceByOrderId(orderId);
  }

  @Mutation(() => InvoicesTbl, { name: 'payInvoiceByOrderId' })
  @UseGuards(JwtAuthGuard)
  async payInvoiceByOrderId(
    @Args('orderId', { type: () => Int }) orderId: number,
    @Context() context: any,
  ) {
    const userId = context.req?.user?.userId || context.user?.userId;
    const userRole = context.req?.user?.role || context.user?.role;

    // Users can only pay their own invoices unless they're admin
    if (userRole !== 'admin') {
      const order = await this.ordersService.orderDetails(orderId);
      if (!order || order.userId !== userId) {
        throw new ForbiddenException('You do not have permission to pay this invoice');
      }
    }

    return this.invoicesService.payInvoiceByOrderId(orderId);
  }
}
