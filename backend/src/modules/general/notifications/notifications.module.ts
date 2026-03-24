import { Module } from '@nestjs/common';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsTbl } from './entity/notifications.tbl';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationsTbl]),
    AuthModule,
  ],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService], // Export so other modules can inject it
})
export class NotificationsModule {}
