import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Field, Float, Int, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  productName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  productDescription?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  sku: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  productPrice: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  reorderPoint: number;

  @Field()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  available: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  inTransit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  blocked?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
