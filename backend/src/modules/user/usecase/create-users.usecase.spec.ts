import { CreateUserUseCase } from './create-user.usecase';
import { User } from '../entity/user.entity';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar um usuário', async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    const userFake: User = {
      id: 1,
      name: 'Lidiane',
      email: 'lidiane@example.com',
    };
    mockUserRepository.createUser.mockResolvedValue(userFake);

    const result = await createUserUseCase.execute(
      'Lidiane',
      'lidiane@example.com'
    );

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      'lidiane@example.com'
    );

    expect(mockUserRepository.createUser).toHaveBeenCalledWith({
      name: 'Lidiane',
      email: 'lidiane@example.com',
    });

    expect(result).toEqual(userFake);
  });
});
