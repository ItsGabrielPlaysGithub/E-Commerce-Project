import { Resolver, Query, Mutation, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../general/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../general/auth/guards/roles.guard';
import { CategoriesService } from './categories.service';
import { CategoriesTbl } from './entity/categories.tbl';
import { CreateCategoryDto } from './dto/create.categories';
import { UpdateCategoryDto } from './dto/update.categories';

@ObjectType()
class AssignmentResult {
    @Field()
    message: string;

    @Field(() => Int)
    count: number;
}

@Resolver()
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Query(() => [CategoriesTbl], { name: 'getCategories' })
    async readCategories() {
        return await this.categoriesService.readCategories();
    }

    @Query(() => CategoriesTbl, { name: 'getCategoryById' })
    async readCategoryById(@Args('categoryId', { type: () => Int }) categoryId: number) {
        return await this.categoriesService.readCategoryById(categoryId);
    }

    @Query(() => CategoriesTbl, { name: 'getCategoryBySlug' })
    async readCategoryBySlug(@Args('slug') slug: string) {
        return await this.categoriesService.readCategoryBySlug(slug);
    }

    @Mutation(() => CategoriesTbl, { name: 'createCategory' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async createCategory(@Args('input', { type: () => CreateCategoryDto }) input: CreateCategoryDto) {
        return await this.categoriesService.createCategory(input);
    }

    @Mutation(() => CategoriesTbl, { name: 'updateCategory' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async updateCategory(
      @Args('id', { type: () => Int }) id: number,
      @Args('input', { type: () => UpdateCategoryDto }) input: UpdateCategoryDto
    ) {
        return await this.categoriesService.updateCategory(id, input);
    }

    @Mutation(() => CategoriesTbl, { name: 'deleteCategory' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async deleteCategory(@Args('categoryId', { type: () => Int }) categoryId: number) {
        return await this.categoriesService.deleteCategory(categoryId);
    }

    @Mutation(() => AssignmentResult, { name: 'assignRandomCategoriesToProducts' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    async assignRandomCategoriesToProducts() {
        return await this.categoriesService.assignRandomCategoriesToProducts();
    }
}
