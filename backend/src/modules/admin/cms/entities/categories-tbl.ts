import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories_landing_tbl')
@ObjectType('CmsCategoriesTbl')
export class CategoriesTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare categoryId: number;

    @Column()
    @Field()
    declare categoryName: string;

    @Column()
    @Field()
    declare imageUrl: string;

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