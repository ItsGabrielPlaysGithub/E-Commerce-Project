import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsTbl } from "../../products/entity/products.tbl";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";
import { OrderStatus } from "./order-status.enum";

@Entity('orders_tbl')
@ObjectType()
export class OrdersTbl {
    @PrimaryGeneratedColumn()
    @Field()
    orderId: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    orderNumber?: string;

    @Column()
    @Field()
    productId: number;

    @Column()
    @Field()
    userId: number

    @Column({ nullable: true })
    @Field({ nullable: true })
    orderType?: string;

    @Column()
    @Field()
    quantity: number;

    @Column()
    @Field()
    unitPrice: number;

    @Column()
    @Field()
    totalPrice: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    deliveryFee?: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    grandTotal?: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING_APPROVAL })
    @Field()
    status: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    deliveryStatus?: string;

    @Column({ nullable: true, default: false })
    @Field({ nullable: true })
    usePrimaryAddress?: boolean;

    @Column({ type: 'text', nullable: true })
    @Field({ nullable: true })
    deliveryAddress?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    contactPerson?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    contactNumber?: string;

    @Column({ type: 'timestamp', nullable: true })
    @Field({ nullable: true })
    deliveryDate?: Date;

    @Column({ type: 'text', nullable: true })
    @Field({ nullable: true })
    deliveryNotes?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    paymentMethod?: string;

    @Column({ type: 'text', nullable: true })
    @Field({ nullable: true })
    paymentProofImage?: string;

    @Column({ type: 'timestamp', nullable: true })
    @Field({ nullable: true })
    paymentProofUploadedAt?: Date;

    @Column({ type: 'varchar', length: 500, nullable: true })
    @Field({ nullable: true })
    paymentProofRejectionReason?: string;

    @Column({ type: 'int', default: 0 })
    @Field()
    paymentProofAttempts: number = 0;

    @Column({ type: 'enum', enum: ['pending', 'rejected', 'approved'], nullable: true })
    @Field({ nullable: true })
    paymentProofStatus?: 'pending' | 'rejected' | 'approved';

    @Column({ nullable: true })
    @Field({ nullable: true })
    paymongoTransactionId?: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    paymongoAmount?: number;

    @Column({ nullable: true })
    @Field({ nullable: true })
    paymongoPaymentMethod?: string;

    @Column({ type: 'timestamp', nullable: true })
    @Field({ nullable: true })
    paymongoTimestamp?: Date;

    @Column({ type: 'varchar', length: 200, nullable: true })
    @Field({ nullable: true })
    rejectionReason?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @Field()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @Field()
    updatedAt: Date;
    
    @ManyToOne(() => ProductsTbl)
    @JoinColumn({ name: 'productId' })
    product: ProductsTbl;

    @ManyToOne(() => UsersTbl)
    @JoinColumn({ name: 'userId' })
    user: UsersTbl;
}