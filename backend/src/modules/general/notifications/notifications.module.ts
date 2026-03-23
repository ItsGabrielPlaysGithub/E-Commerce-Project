import { Module } from '@nestjs/common';
import { NotificationsResolver } from './notifications.resolver';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsTbl } from './entity/notifications.tbl';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationsTbl]),
  ],
  providers: [NotificationsResolver, NotificationsService],
  exports: [NotificationsService], // Export so other modules can inject it
})
export class NotificationsModule {}
