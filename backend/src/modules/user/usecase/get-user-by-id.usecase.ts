import { Injectable } from '@nestjs/common';

import { UserRepository } from './ports/repositories/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
