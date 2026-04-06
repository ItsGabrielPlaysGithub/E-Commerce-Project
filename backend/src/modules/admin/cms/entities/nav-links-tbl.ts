import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NavBarTbl } from './nav-bar-tbl';

@Entity('nav_links_tbl')
@ObjectType()
export class NavLinksTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare navLinkId: number;

  @Column()
  @Field(() => Int)
  declare navBarId: number;

  @ManyToOne(() => NavBarTbl, (navBar) => navBar.navLinks)
  @JoinColumn({ name: 'navBarId' })
  @Field(() => NavBarTbl, { nullable: true })
  navBar?: NavBarTbl;

  @Column()
  @Field()
  declare navLinkName: string;

  @Column()
  @Field()
  declare navLinkUrl: string;

  @Column()
  @Field()
  declare isActive: string;

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
