import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_tbl')
@ObjectType()
export class UsersTbl {
  @PrimaryGeneratedColumn()
  @Field()
  userId: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  middleName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ unique: true })
  @Field()
  emailAddress: string;

  @Column()
  @Field()
  companyName: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: 'partner' })
  @Field()
  role: string;

  @Column()
  @Field()
  profPicture?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field()
  updatedAt: Date;

  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
}
