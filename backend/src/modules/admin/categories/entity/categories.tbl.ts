import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ProductsTbl } from "../../products/entity/products.tbl";

@Entity('categories_tbl')
@ObjectType()
@Unique(['slug'])
@Unique(['skuPrefix'])
export class CategoriesTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    categoryId: number;

    @Column()
    @Field()
    categoryName: string;

    @Column()
    @Field()
    slug: string;

    @Column()
    @Field()
    skuPrefix: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;

    @OneToMany(() => ProductsTbl, (product) => product.category)
    @Field(() => [ProductsTbl], { nullable: true })
    products?: ProductsTbl[];
}
