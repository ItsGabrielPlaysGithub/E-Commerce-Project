import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hero_section_tbl')
@ObjectType()
export class HeroSectionTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare heroSectionId: number;

    @Column()
    @Field()
    declare title: string;

    @Column()
    @Field()
    declare headlineOne: string;

    @Column()
    @Field()
    declare headlineTwo: string;

    @Column()
    @Field()
    declare description: string;

    @Column()
    @Field()
    declare buttonText: string;

    @Column()
    @Field()
    declare buttonLink: string;

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


