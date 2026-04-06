import {
  Mutation,
  Query,
  Resolver,
  Args,
  ResolveField,
  Context,
} from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../../general/auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../../general/auth/guards/roles.guard';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { UsersCrudService } from './users-crud.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Resolver(() => UsersTbl)
export class UsersCrudResolver {
  constructor(private readonly usersCrudService: UsersCrudService) {}

  @Query(() => [UsersTbl], { name: 'getAllUsers' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async getAllUsers() {
    return await this.usersCrudService.allUsers();
  }

  @Mutation(() => UsersTbl, { name: 'createUser' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async createUser(@Args('input') input: CreateUserDto) {
    return await this.usersCrudService.createUser(input);
  }

  @Mutation(() => UsersTbl, { name: 'updateUser' })
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('input') input: UpdateUserDto,
    @Context() context: any,
  ) {
    const userId = context.req?.user?.userId || context.user?.userId;
    const userRole = context.req?.user?.role || context.user?.role;

    if (!userId) throw new ForbiddenException('Not authenticated');

    // Allow update only if user owns the account OR is an admin
    if (input.userId !== userId && userRole !== 'admin') {
      throw new ForbiddenException('You can only update your own profile');
    }

    return await this.usersCrudService.updateUser(input);
  }

  @Mutation(() => UsersTbl, { name: 'deleteUser' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteUser(@Args('userId', { type: () => Int }) userId: number) {
    return await this.usersCrudService.deleteUser(userId);
  }

  // client side - read own profile
  @Query(() => UsersTbl, { name: 'readProfile' })
  @UseGuards(JwtAuthGuard)
  async readProfile(@Context() context: any) {
    const userId = context.req?.user?.userId || context.user?.userId;
    if (!userId) throw new ForbiddenException('Not authenticated');
    return await this.usersCrudService.readProfile(userId);
  }
  @ResolveField(() => String, { name: 'fullName' })
  async fullName(parent: UsersTbl): Promise<string> {
    return `${parent.firstName} ${parent.middleName} ${parent.lastName}`;
  }
}
