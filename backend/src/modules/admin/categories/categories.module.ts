import { Module } from '@nestjs/common';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesTbl } from './entity/categories.tbl';
import { ProductsTbl } from '../products/entity/products.tbl';
import { AuthModule } from '../../general/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriesTbl, ProductsTbl]), AuthModule],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
