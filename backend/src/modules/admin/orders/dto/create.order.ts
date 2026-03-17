import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { OrderStatus } from '../entity/order-status.enum';

@InputType()
export class CreateOrderDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  orderNumber: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  orderType?: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deliveryStatus?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paymentProofImage?: string;

  @Field({ nullable: true })
  @IsOptional()
  paymentProofUploadedAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paymongoTransactionId?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  paymongoAmount?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  paymongoPaymentMethod?: string;

  @Field({ nullable: true })
  @IsOptional()
  paymongoTimestamp?: Date;
}
