import { Injectable } from '@nestjs/common';

import { UserRepository } from './ports/repositories/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
