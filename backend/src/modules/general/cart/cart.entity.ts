import { Field, InputType, Int, ObjectType, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
  @Field(() => Float)
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
  @IsInt()
  @Min(1)
  productId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  quantity: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  unitPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  selectedColor?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  selectedSize?: string;
}

@InputType()
export class UpdateCartItemInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
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
