import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('footer_tbl')
@ObjectType()
export class FooterTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare footerId: number;

    @Column()
    @Field()
    declare description: string;

    @Column()
    @Field()
    declare copyright: string;

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