import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products_tbl')
@ObjectType()
export class ProductsTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    productId: number;

    @Column()
    @Field()
    productName: string;

    @Column()
    @Field()
    productDescription: string;

    @Column()
    @Field()
    sku: string;

    @Column()
    @Field()
    category: string;

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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;
}