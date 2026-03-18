import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cart_items')
@ObjectType()
export class CartItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @Column()
  @Field(() => Int)
  productId: number;

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  unitPrice: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  selectedColor?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  selectedSize?: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}

@InputType()
export class AddToCartInput {
  @Field(() => Int)
  productId: number;

  @Field(() => Int)
  quantity: number;

  @Field()
  unitPrice: number;

  @Field({ nullable: true })
  selectedColor?: string;

  @Field({ nullable: true })
  selectedSize?: string;
}

@InputType()
export class UpdateCartItemInput {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class CartResponse {
  @Field(() => [CartItem])
  items: CartItem[];

  @Field()
  totalItems: number;

  @Field()
  totalPrice: number;
}
