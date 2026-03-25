import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  @IsNotEmpty()
  productId: number;

  @Field(() => Int)
  @IsNotEmpty()
  quantity: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  unitPrice?: number;
}

@InputType()
export class DeliveryDetailsInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  deliveryDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  usePrimaryAddress?: boolean;
}

@InputType('PlaceOrderInput')
export class PlaceOrderDto {
  @Field(() => [OrderItemInput])
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInput)
  items: OrderItemInput[];

  @Field(() => DeliveryDetailsInput)
  @ValidateNested()
  @Type(() => DeliveryDetailsInput)
  delivery: DeliveryDetailsInput;

  @Field(() => Float)
  @IsNumber()
  subtotal: number;

  @Field(() => Float)
  @IsNumber()
  deliveryFee: number;

  @Field(() => Float)
  @IsNumber()
  grandTotal: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  companyId?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
