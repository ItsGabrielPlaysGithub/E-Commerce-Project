import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from '../config/db.config';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './modules/general/auth/auth.module';
import { NotificationsModule } from './modules/general/notifications/notifications.module';
import { UsersCrudModule } from './modules/admin/users-crud/users-crud.module';
import { ProductsModule } from './modules/admin/products/products.module';
import { OrdersModule } from './modules/admin/orders/orders.module';
import { MailerModule } from './modules/general/mailer/mailer.module';
import { InvoicesModule } from './modules/admin/invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConfig,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.PLAYGROUND === 'true',
      csrfPrevention: true,
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    UsersCrudModule,
    NotificationsModule,
    MailerModule,
    ProductsModule,
    OrdersModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
