import { Injectable } from '@nestjs/common';

import { UserRepository } from './ports/repositories/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, name: string, email: string): Promise<User> {
    return this.userRepository.updateUser(id, { name, email });
  }
}
