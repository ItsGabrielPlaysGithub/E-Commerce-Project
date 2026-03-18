import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart.entity';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}
