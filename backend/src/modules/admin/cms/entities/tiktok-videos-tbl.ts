import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TiktokCarouselsTbl } from './tiktok-carousels-tbl';

@Entity('cms_tiktok_videos_tbl')
@ObjectType()
export class TiktokVideosTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare videoId: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  declare carouselId: number;

  @ManyToOne(() => TiktokCarouselsTbl, (carousel) => carousel.videos)
  @JoinColumn({ name: 'carouselId' })
  @Field(() => TiktokCarouselsTbl, { nullable: true })
  carousel?: TiktokCarouselsTbl;

  @Column({ type: 'varchar', length: 500 })
  @Field()
  declare tiktokUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Field({ nullable: true })
  caption?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @Field({ nullable: true })
  buyNowUrl?: string;

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
}
