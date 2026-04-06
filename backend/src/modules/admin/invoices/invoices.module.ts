import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesTbl } from './entity/invoices.tbl';
import { InvoicesResolver } from './invoices.resolver';
import { InvoicesService } from './invoices.service';
import { OrdersTbl } from '../orders/entity/orders.tbl';
import { PaymentsTbl } from '../payments/entity/payments.tbl';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { AuthModule } from '../../general/auth/auth.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoicesTbl, OrdersTbl, PaymentsTbl, UsersTbl]),
    AuthModule,
    forwardRef(() => OrdersModule),
  ],
  providers: [InvoicesResolver, InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
