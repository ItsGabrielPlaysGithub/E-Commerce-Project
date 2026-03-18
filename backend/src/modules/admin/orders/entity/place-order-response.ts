import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PlaceOrderResponse {
  @Field()
  success: boolean;

  @Field()
  orderNumber: string;

  @Field()
  message: string;

  @Field(() => Int, { nullable: true })
  orderId?: number;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
