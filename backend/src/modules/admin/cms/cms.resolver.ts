import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CmsService } from './cms.service';
import { NavBarTbl } from './entities/nav-bar-tbl';
import { CategoriesTbl } from './entities/categories-tbl';
import { TiktokCarouselsTbl } from './entities/tiktok-carousels-tbl';

@Resolver()
export class CmsResolver {
    constructor(private readonly cmsService: CmsService) {}

    @Query(() => [NavBarTbl], { name: 'cmsNavBars' })
    async getAllNavBars(): Promise<NavBarTbl[]> {
        return this.cmsService.getAllNavBars();
    }

    @Mutation(() => NavBarTbl)
    async createNavBar(
        @Args('navBarName') navBarName: string,
    ): Promise<NavBarTbl> {
        return this.cmsService.createNavBar(navBarName);
    }

    @Mutation(() => NavBarTbl)
    async updateNavBar(
        @Args('navBarId', { type: () => Int }) navBarId: number,
        @Args('navBarName') navBarName: string,
    ): Promise<NavBarTbl> {
        return this.cmsService.updateNavBar(navBarId, navBarName);
    }

    @Mutation(() => NavBarTbl)
    async deleteNavBar(
        @Args('navBarId', { type: () => Int }) navBarId: number,
    ): Promise<NavBarTbl> {
        return this.cmsService.deleteNavBar(navBarId);
    }

    @Query(() => [CategoriesTbl], { name: 'cmsCategories' })
    async getAllCategories(): Promise<CategoriesTbl[]> {
        return this.cmsService.getAllCategories();
    }

    @Mutation(() => CategoriesTbl)
    async createCategory(
        @Args('categoryName') categoryName: string,
        @Args('imageUrl') imageUrl: string,
    ): Promise<CategoriesTbl> {
        return this.cmsService.createCategory(categoryName, imageUrl);
    }

    @Mutation(() => CategoriesTbl)
    async updateCategory(
        @Args('categoryId', { type: () => Int }) categoryId: number,
        @Args('categoryName') categoryName: string,
        @Args('imageUrl') imageUrl: string,
    ): Promise<CategoriesTbl> {
        return this.cmsService.updateCategory(categoryId, categoryName, imageUrl);
    }

    @Mutation(() => CategoriesTbl)
    async deleteCategory(
        @Args('categoryId', { type: () => Int }) categoryId: number,
    ): Promise<CategoriesTbl> {
        return this.cmsService.deleteCategory(categoryId);
    }

    @Query(() => [TiktokCarouselsTbl], { name: 'cmsCarousels' })
    async getAllCarousels(): Promise<TiktokCarouselsTbl[]> {
        return this.cmsService.getAllCarousels();
    }

    @Mutation(() => TiktokCarouselsTbl)
    async createCarousel(
        @Args('categoryName') categoryName: string,
        @Args('subtitle', { nullable: true }) subtitle?: string,
        @Args('sortOrder', { type: () => Int, nullable: true }) sortOrder?: number,
    ): Promise<TiktokCarouselsTbl> {
        return this.cmsService.createCarousel(categoryName, subtitle, sortOrder ?? 0);
    }

    @Mutation(() => TiktokCarouselsTbl)
    async updateCarousel(
        @Args('carouselId', { type: () => Int }) carouselId: number,
        @Args('categoryName') categoryName: string,
        @Args('subtitle', { nullable: true }) subtitle?: string,
        @Args('sortOrder', { type: () => Int, nullable: true }) sortOrder?: number,
    ): Promise<TiktokCarouselsTbl> {
        return this.cmsService.updateCarousel(carouselId, categoryName, subtitle, sortOrder ?? 0);
    }

    @Mutation(() => TiktokCarouselsTbl)
    async deleteCarousel(
        @Args('carouselId', { type: () => Int }) carouselId: number,
    ): Promise<TiktokCarouselsTbl> {
        return this.cmsService.deleteCarousel(carouselId);
    }
}
