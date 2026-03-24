import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { NotificationsService } from './notifications.service';
import { NotificationsTbl } from './entity/notifications.tbl';
import { CreateNotificationDto } from './dto/create-notification';

@Resolver(() => NotificationsTbl)
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService) {}

  @Query(() => [NotificationsTbl])
  @UseGuards(JwtAuthGuard)
  async getNotificationsByUserId(
    @Context() context: any,
  ): Promise<NotificationsTbl[]> {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Unauthorized: User ID not found in request');
    return await this.notificationsService.getNotificationsByUserId(userId);
  }

  @Query(() => Int)
  @UseGuards(JwtAuthGuard)
  async getUnreadNotificationCount(
    @Context() context: any,
  ): Promise<number> {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Unauthorized: User ID not found in request');
    return await this.notificationsService.getUnreadCount(userId);
  }

  @Query(() => NotificationsTbl)
  @UseGuards(JwtAuthGuard)
  async getNotification(
    @Args('notificationId', { type: () => Int }) notificationId: number,
    @Context() context: any,
  ): Promise<NotificationsTbl> {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Unauthorized: User ID not found in request');
    // Verify the notification belongs to this user
    const notification = await this.notificationsService.getNotificationById(notificationId);
    if (notification.userId !== userId) {
      throw new ForbiddenException('Unauthorized: Cannot access this notification');
    }
    return notification;
  }

  @Mutation(() => NotificationsTbl)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createNotification(
    @Args('input', { type: () => CreateNotificationDto })
    input: CreateNotificationDto,
  ): Promise<NotificationsTbl> {
    return await this.notificationsService.createNotification(input);
  }

  @Mutation(() => NotificationsTbl)
  @UseGuards(JwtAuthGuard)
  async markNotificationAsRead(
    @Args('notificationId', { type: () => Int }) notificationId: number,
    @Context() context: any,
  ): Promise<NotificationsTbl> {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Unauthorized: User ID not found in request');
    // Verify the notification belongs to this user
    const notification = await this.notificationsService.getNotificationById(notificationId);
    if (notification.userId !== userId) {
      throw new ForbiddenException('Unauthorized: Cannot modify this notification');
    }
    return await this.notificationsService.markAsRead(notificationId);
  }

  @Mutation(() => [NotificationsTbl])
  @UseGuards(JwtAuthGuard)
  async markAllNotificationsAsRead(
    @Context() context: any,
  ): Promise<NotificationsTbl[]> {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Unauthorized: User ID not found in request');
    return await this.notificationsService.markAllAsRead(userId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteNotification(
    @Args('notificationId', { type: () => Int }) notificationId: number,
    @Context() context: any,
  ): Promise<boolean> {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Unauthorized: User ID not found in request');
    // Verify the notification belongs to this user
    const notification = await this.notificationsService.getNotificationById(notificationId);
    if (notification.userId !== userId) {
      throw new ForbiddenException('Unauthorized: Cannot delete this notification');
    }
    await this.notificationsService.deleteNotification(notificationId);
    return true;
  }
}
