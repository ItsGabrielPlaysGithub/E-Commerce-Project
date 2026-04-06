import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { PaymentProofController } from './payment-proof.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersTbl } from './entity/orders.tbl';
import { InvoicesModule } from '../invoices/invoices.module';
import { ProductsTbl } from '../products/entity/products.tbl';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { NotificationsModule } from '../../general/notifications/notifications.module';
import { AuthModule } from '../../general/auth/auth.module';
import { PaymongoModule } from '../../general/paymongo/paymongo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersTbl, ProductsTbl, UsersTbl]),
    InvoicesModule,
    NotificationsModule,
    AuthModule,
    PaymongoModule,
  ],
  providers: [OrdersResolver, OrdersService],
  controllers: [PaymentProofController],
  exports: [OrdersService],
})
export class OrdersModule {}
