import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  categoryName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  slug: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  skuPrefix: string;
}
