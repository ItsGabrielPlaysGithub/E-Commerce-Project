import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';
import { OrderStatus } from '../entity/order-status.enum';

@InputType()
export class TransitionOrderStatusDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  nextStatus: OrderStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(10)
  @MaxLength(200)
  rejectionReason?: string;
}
