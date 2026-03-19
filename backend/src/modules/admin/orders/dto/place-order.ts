import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class OrderItemInput {
  @Field(() => Int)
  @IsNotEmpty()
  productId: number;

  @Field(() => Int)
  @IsNotEmpty()
  quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  unitPrice: number;
}

@InputType()
export class DeliveryDetailsInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  contactPerson: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @Field()
  @IsNotEmpty()
  deliveryDate: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
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
