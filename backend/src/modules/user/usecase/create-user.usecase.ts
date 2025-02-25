import { Injectable } from '@nestjs/common';

import { UserRepository } from './ports/repositories/user.repository';
import { User } from '../entity/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(name: string, email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    return this.userRepository.createUser({ name, email });
  }
}
