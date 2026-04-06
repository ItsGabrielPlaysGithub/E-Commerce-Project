import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NavLinksTbl } from './nav-links-tbl';

@Entity('nav_bar_tbl')
@ObjectType()
export class NavBarTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  declare navBarId: number;

  @Column()
  @Field()
  declare navBarName: string;

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

  @OneToMany(() => NavLinksTbl, (navLink) => navLink.navBar)
  @Field(() => [NavLinksTbl], { nullable: true })
  navLinks?: NavLinksTbl[];
}