import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('site_settings_tbl')
@ObjectType()
export class SiteSettingsTbl {
    @PrimaryGeneratedColumn()
    @Field(() => Int)
    declare settingId: number;

    @Column()
    @Field()
    declare siteName: string;

    @Column()
    @Field()
    declare siteDescription: string;

    @Column()
    @Field()
    declare brandTagline: string;

    @Column()
    @Field()
    declare contactEmail: string;

    @Column()
    @Field()
    declare contactPhone: string;

    @Column()
    @Field()
    declare address: string;

    @Column()
    @Field()
    declare weekdaysHrs: string;

    @Column()
    @Field()
    declare weekendHrs: string;

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