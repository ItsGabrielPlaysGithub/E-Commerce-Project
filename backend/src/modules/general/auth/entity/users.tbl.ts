import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_tbl')
@ObjectType()
export class UsersTbl {
  @PrimaryGeneratedColumn()
  @Field()
  declare userId: number;

  @Column()
  @Field()
  declare firstName: string;

  @Column()
  @Field()
  declare middleName: string;

  @Column()
  @Field()
  declare lastName: string;

  @Column({ unique: true })
  @Field()
  declare emailAddress: string;

  @Column()
  @Field()
  declare companyName: string;

  @Column()
  @Field()
  declare address: string;

  @Column()
  @Field()
  declare phoneNumber: string;

  @Column()
  declare password: string;

  @Column({ default: 'partner' })
  @Field()
  declare role: string;

  @Column()
  @Field()
  profPicture?: string;

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

  @Field()
  get fullName(): string {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
}
