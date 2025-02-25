import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';
import { UserRepository } from './usecase/ports/repositories/user.repository';
import { CreateUserUseCase } from './usecase/create-user.usecase';
import { GetUsersUseCase } from './usecase/get-users.usecase';
import { UpdateUserUseCase } from './usecase/update-user.usecase';
import { DeleteUserUseCase } from './usecase/delete-user.usecase';
import { GetUserByIdUseCase } from './usecase/get-user-by-id.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    CreateUserUseCase,
    GetUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
  ],
  exports: [UserService],
})
export class UserModule {}
