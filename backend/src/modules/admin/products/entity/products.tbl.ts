import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriesTbl } from '../../categories/entity/categories.tbl';

@Entity('products_tbl')
@ObjectType()
export class ProductsTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  productId: number;

  @Column()
  @Field()
  productName: string;

  @Column('longtext')
  @Field()
  productDescription: string;
  @Column({ type: 'varchar', length: 500, nullable: true })
  @Field({ nullable: true })
  imageUrl: string;
  @Column()
  @Field()
  sku: string;

  @Column()
  @Field(() => Int)
  categoryId: number;

  @ManyToOne(() => CategoriesTbl, (category) => category.products)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  @Field(() => CategoriesTbl, { nullable: true })
  category?: CategoriesTbl;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  productPrice: number;

  @Column({ default: 0 })
  @Field(() => Int)
  reorderPoint: number;

  @Column({ default: 0 })
  @Field(() => Int)
  available: number;

  @Column({ default: 0 })
  @Field(() => Int)
  inTransit: number;

  @Column({ default: 0 })
  @Field(() => Int)
  blocked: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updatedAt: Date;
}
