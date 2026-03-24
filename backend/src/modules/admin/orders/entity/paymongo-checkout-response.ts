import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymongoCheckoutResponse {
  @Field()
  success: boolean;

  @Field()
  paymentIntentId: string;

  @Field()
  checkoutUrl: string;

  @Field()
  message: string;
}
