import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import { CreateUserUseCase } from '../usecase/create-user.usecase';
import { GetUsersUseCase } from '../usecase/get-users.usecase';
import { User } from '../entity/user.entity';
import { DeleteUserUseCase } from '../usecase/delete-user.usecase';
import { UpdateUserUseCase } from '../usecase/update-user.usecase';
import { GetUserByIdUseCase } from '../usecase/get-user-by-id.usecase';

@Injectable()
export class UserService {
  private readonly cacheKey = 'users_list';
  private readonly cacheKeyUserById = (id: number) => `user_${id}`;
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly createUser: CreateUserUseCase,

    private readonly getUsers: GetUsersUseCase,

    private readonly updateUser: UpdateUserUseCase,

    private readonly deleteUser: DeleteUserUseCase,

    private readonly getUserById: GetUserByIdUseCase,

    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async create(name: string, email: string): Promise<User> {
    const user = await this.createUser.execute(name, email);
    await this.invalidateCache();

    return user;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Buscando usuários...');

    const cachedUsers = await this.cacheManager.get<User[]>(this.cacheKey);
    if (cachedUsers) {
      this.logger.log('Retornando usuários do cache');

      return cachedUsers;
    }

    const users = await this.getUsers.execute();
    this.logger.log('Salvando usuários no cache');

    await this.cacheManager.set(this.cacheKey, users, 300);
    const testCache = await this.cacheManager.get(this.cacheKey);

    if (testCache) {
      this.logger.log('Dado armazenado no cache: ', testCache);
    } else {
      this.logger.log(
        'Os dados não estão sendo armazenados corretamente no cache!'
      );
    }

    return users;
  }

  async update(id: number, name: string, email: string): Promise<User> {
    const user = await this.updateUser.execute(id, name, email);
    await this.invalidateCache();

    return user;
  }

  async delete(id: number): Promise<void> {
    await this.deleteUser.execute(id);
    await this.invalidateCache();
  }

  private async invalidateCache() {
    this.logger.log('Invalidando cache...');

    await this.cacheManager.del(this.cacheKey);
  }

  async findById(id: number): Promise<User | null> {
    this.logger.log('Buscando usuário pelo ID...');

    const cacheKey = this.cacheKeyUserById(id);
    const cachedUser = await this.cacheManager.get<User>(cacheKey);
    if (cachedUser) {
      this.logger.log('Usuário não encontrado no cache');
      return cachedUser;
    }

    const user = await this.getUserById.execute(id);
    if (!user) {
      this.logger.log('Usuário não encontrado!');
      return null;
    }

    this.logger.log('Armazenando usuário no cache...');
    await this.cacheManager.set(cacheKey, user, 300);

    return user;
  }
}
