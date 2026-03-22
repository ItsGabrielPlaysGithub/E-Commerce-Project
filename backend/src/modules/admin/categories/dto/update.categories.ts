import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCategoryDto } from './create.categories';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @Field(() => Int, { nullable: true })
    categoryId?: number;
}
