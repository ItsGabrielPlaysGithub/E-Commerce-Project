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
  declare productId: number;

  @Column()
  @Field()
  declare productName: string;

  @Column('longtext')
  @Field()
  declare productDescription: string;
  @Column({ type: 'varchar', length: 500, nullable: true })
  @Field({ nullable: true })
  declare imageUrl: string;
  @Column()
  @Field()
  declare sku: string;

  @Column()
  @Field(() => Int)
  declare categoryId: number;

  @ManyToOne(() => CategoriesTbl, (category) => category.products)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  @Field(() => CategoriesTbl, { nullable: true })
  category?: CategoriesTbl;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  declare productPrice: number;

  @Column({ default: 0 })
  @Field(() => Int)
  declare reorderPoint: number;

  @Column({ default: 0 })
  @Field(() => Int)
  declare available: number;

  @Column({ default: 0 })
  @Field(() => Int)
  declare inTransit: number;

  @Column({ default: 0 })
  @Field(() => Int)
  declare blocked: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  declare createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  declare updatedAt: Date;
}
