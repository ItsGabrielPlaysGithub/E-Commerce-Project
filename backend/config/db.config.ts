import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";
import { OrdersTbl } from "src/modules/admin/orders/entity/orders.tbl";
import { InvoicesTbl } from "src/modules/admin/invoices/entity/invoices.tbl";
import { ProductsTbl } from "src/modules/admin/products/entity/products.tbl";
import { PaymentsTbl } from "src/modules/admin/payments/entity/payments.tbl";

export const DatabaseConfig =  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [UsersTbl, OrdersTbl, InvoicesTbl, ProductsTbl, PaymentsTbl, ],
        synchronize: config.get<string>('DB_SYNC') === 'true',
    })
})