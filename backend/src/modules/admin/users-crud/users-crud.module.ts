import { Module } from '@nestjs/common';
import { UsersCrudResolver } from './users-crud.resolver';
import { UsersCrudService } from './users-crud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersTbl } from '../../general/auth/entity/users.tbl';
import { AuthModule } from '../../general/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersTbl]), AuthModule],
  providers: [UsersCrudResolver, UsersCrudService],
})
export class UsersCrudModule {}
