import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('social_links_tbl')
@ObjectType()
export class SocialLinksTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare socialLinkId: number;

    @Column()
    @Field()
    declare platform: string;

    @Column()
    @Field()
    declare url: string;

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