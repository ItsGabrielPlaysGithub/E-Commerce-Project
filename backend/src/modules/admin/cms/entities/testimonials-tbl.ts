import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('testimonials_tbl')
@ObjectType()
export class TestimonialsTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare testimonialId: number;

    @Column()
    @Field()
    declare customerName: string;

    @Column()
    @Field()
    declare message: string;

    @Column()
    @Field()
    declare rating: number;

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