import { Field, InputType, Int, ObjectType, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

@Entity('cart_items')
@ObjectType()
export class CartItem {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare id: number;

  @Column()
  @Field(() => Int)
  declare userId: number;

  @Column()
  @Field(() => Int)
  declare productId: number;

  @Column()
  @Field(() => Int)
  declare quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  declare unitPrice: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  selectedColor?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  selectedSize?: string;

  @CreateDateColumn()
  @Field()
  declare createdAt: Date;

  @UpdateDateColumn()
  @Field()
  declare updatedAt: Date;
}

@InputType()
export class AddToCartInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  declare productId: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  declare quantity: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  declare unitPrice: number;

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
  declare id: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  declare quantity: number;
}

@ObjectType()
export class CartResponse {
  @Field(() => [CartItem])
  declare items: CartItem[];

  @Field()
  declare totalItems: number;

  @Field()
  declare totalPrice: number;
}
