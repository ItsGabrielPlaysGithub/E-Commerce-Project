import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersTbl } from '../../auth/entity/users.tbl';

@Entity('notifications_tbl')
@ObjectType()
export class NotificationsTbl {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  notificationId: number;

  @Column()
  @Field()
  userId: number;

  @ManyToOne(() => UsersTbl, { eager: false })
  @JoinColumn({ name: 'userId' })
  user?: UsersTbl;

  @Column({ type: 'varchar', length: 50 })
  @Field()
  type: 'payment_proof_rejected' | 'payment_proof_approved' | 'order_status_change' | 'general';

  @Column({ type: 'varchar', length: 255 })
  @Field()
  title: string;

  @Column({ type: 'text' })
  @Field()
  message: string;

  @Column({ nullable: true, type: 'int' })
  @Field(() => Int, { nullable: true })
  orderId?: number;

  @Column({ nullable: true, type: 'text' })
  @Field({ nullable: true })
  metadata?: string; // JSON stringified extra data

  @Column({ default: false })
  @Field()
  isRead: boolean = false;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @Field({ nullable: true })
  readAt?: Date;
}
