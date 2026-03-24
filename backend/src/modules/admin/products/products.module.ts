import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { ProductImageController } from './product-image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsTbl } from './entity/products.tbl';
import { CategoriesTbl } from '../categories/entity/categories.tbl';
import { AuthModule } from '../../general/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsTbl, CategoriesTbl]),
    AuthModule,
  ],
  controllers: [ProductImageController],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
