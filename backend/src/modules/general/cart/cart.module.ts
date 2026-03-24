import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart.entity';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { ProductsTbl } from '../../admin/products/entity/products.tbl';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, ProductsTbl]), AuthModule],
  providers: [CartService, CartResolver],
  exports: [CartService],
})
export class CartModule {}
