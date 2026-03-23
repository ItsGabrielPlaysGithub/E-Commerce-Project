import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateNotificationDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  type: 'payment_proof_rejected' | 'payment_proof_approved' | 'order_status_change' | 'general';

  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  message: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  orderId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  metadata?: string;
}
