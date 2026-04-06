import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contacts_tbl')
@ObjectType()
export class ContactsTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare contactId: number;

    @Column()
    @Field()
    declare name: string;

    @Column()
    @Field()
    declare email: string;

    @Column()
    @Field()
    declare message: string;

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