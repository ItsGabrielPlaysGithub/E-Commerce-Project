import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';
import { NotificationsTbl } from './entity/notifications.tbl';
import { CreateNotificationDto } from './dto/create-notification';

@Resolver(() => NotificationsTbl)
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  @Query(() => [NotificationsTbl])
  async getNotificationsByUserId(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<NotificationsTbl[]> {
    return await this.notificationsService.getNotificationsByUserId(userId);
  }

  @Query(() => Int)
  async getUnreadNotificationCount(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<number> {
    return await this.notificationsService.getUnreadCount(userId);
  }

  @Query(() => NotificationsTbl)
  async getNotification(
    @Args('notificationId', { type: () => Int }) notificationId: number,
  ): Promise<NotificationsTbl> {
    return await this.notificationsService.getNotificationById(notificationId);
  }

  @Mutation(() => NotificationsTbl)
  async createNotification(
    @Args('input', { type: () => CreateNotificationDto })
    input: CreateNotificationDto,
  ): Promise<NotificationsTbl> {
    return await this.notificationsService.createNotification(input);
  }

  @Mutation(() => NotificationsTbl)
  async markNotificationAsRead(
    @Args('notificationId', { type: () => Int }) notificationId: number,
  ): Promise<NotificationsTbl> {
    return await this.notificationsService.markAsRead(notificationId);
  }

  @Mutation(() => [NotificationsTbl])
  async markAllNotificationsAsRead(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<NotificationsTbl[]> {
    return await this.notificationsService.markAllAsRead(userId);
  }

  @Mutation(() => Boolean)
  async deleteNotification(
    @Args('notificationId', { type: () => Int }) notificationId: number,
  ): Promise<boolean> {
    await this.notificationsService.deleteNotification(notificationId);
    return true; // Successful deletion (errors are thrown by service)
  }
}
