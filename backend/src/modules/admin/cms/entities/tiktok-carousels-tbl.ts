import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TiktokVideosTbl } from './tiktok-videos-tbl';

@Entity('cms_tiktok_carousels_tbl')
@ObjectType()
export class TiktokCarouselsTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare carouselId: number;

  @Column({ type: 'varchar', length: 120 })
  @Field()
  declare categoryName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Field({ nullable: true })
  subtitle?: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  declare sortOrder: number;

  @Column({ type: 'boolean', default: true })
  @Field()
  declare isActive: boolean;

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

  @OneToMany(() => TiktokVideosTbl, (video) => video.carousel)
  @Field(() => [TiktokVideosTbl], { nullable: true })
  videos?: TiktokVideosTbl[];
}
