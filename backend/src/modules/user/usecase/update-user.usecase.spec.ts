import { UpdateUserUseCase } from './update-user.usecase';
import { User } from '../entity/user.entity';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;
  const mockUserRepository = {
    updateUser: jest.fn(),
  };

  beforeEach(() => {
    updateUserUseCase = new UpdateUserUseCase(mockUserRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve atualizar um usuário e retornar o usuário atualizado', async () => {
    const id = 1;
    const name = 'Novo Nome';
    const email = 'novoemail@example.com';
    const updatedUser: User = { id, name, email };
    mockUserRepository.updateUser.mockResolvedValue(updatedUser);

    const result = await updateUserUseCase.execute(id, name, email);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(id, {
      name,
      email,
    });

    expect(result).toEqual(updatedUser);
  });
});
