import { GetUsersUseCase } from './get-users.usecase';
import { User } from '../entity/user.entity';

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;
  const mockUserRepository = {
    findAll: jest.fn(),
  };

  beforeEach(() => {
    getUsersUseCase = new GetUsersUseCase(mockUserRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar um array de usuários', async () => {
    const users: User[] = [
      { id: 1, name: 'Usuário 1', email: 'usuario1@example.com' },
      { id: 2, name: 'Usuário 2', email: 'usuario2@example.com' },
    ];
    mockUserRepository.findAll.mockResolvedValue(users);

    const result = await getUsersUseCase.execute();

    expect(mockUserRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });
});
