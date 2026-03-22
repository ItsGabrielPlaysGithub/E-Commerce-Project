import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RejectPaymentProofDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(10, { message: 'Rejection reason must be at least 10 characters' })
  rejectionReason: string;
}
