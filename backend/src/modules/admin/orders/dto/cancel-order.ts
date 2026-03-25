import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType()
export class CancelOrderDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  orderId: number;
}
