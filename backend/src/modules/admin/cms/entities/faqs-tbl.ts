import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('faqs_tbl')
@ObjectType()
export class FaqsTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare faqId: number;

    @Column()
    @Field()
    declare question: string;

    @Column()
    @Field()
    declare answer: string;

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