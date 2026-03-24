import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../general/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../general/auth/guards/roles.guard';
import { ProductsService } from './products.service';
import { ProductsTbl } from './entity/products.tbl';
import { CreateProductDto } from './dto/create.products';
import { UpdateProductDto } from './dto/update.products';

@Resolver()
export class ProductsResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => [ProductsTbl], { name: 'getProducts' })
    async readProducts() {
        return await this.productsService.readProducts();
    }

    @Query(() => ProductsTbl, { name: 'getProductById' })
    async readProductById(@Args('productId', { type: () => Int }) productId: number) {
        return await this.productsService.readProductById(productId);
    }

    @Query(() => ProductsTbl, { name: 'getProductByName' })
    async readProductByName(@Args('productName', { type: () => String }) productName: string) {
        return await this.productsService.readProductByName(productName);
    }

    @Mutation(() => ProductsTbl, { name: 'createProduct' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async createProduct(@Args('input') input: CreateProductDto) {
        return await this.productsService.createProduct(input);
    }

    @Mutation(() => ProductsTbl, { name: 'updateProduct' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async updateProduct(
      @Args('id', { type: () => Int }) id: number,
      @Args('input') input: UpdateProductDto
    ) {
        return await this.productsService.updateProduct(id, input);
    }

    @Mutation(() => ProductsTbl, { name: 'deleteProduct' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async deleteProduct(@Args('productId', { type: () => Int }) productId: number) {
        return await this.productsService.deleteProduct(productId);
    }
}
