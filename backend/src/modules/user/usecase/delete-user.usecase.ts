import { Injectable } from '@nestjs/common';

import { UserRepository } from './ports/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    return this.userRepository.deleteUser(id);
  }
}
