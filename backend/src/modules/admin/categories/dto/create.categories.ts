import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDto {
    @Field()
    categoryName: string;

    @Field()
    slug: string;

    @Field()
    skuPrefix: string;
}
