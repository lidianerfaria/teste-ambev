import { GetUserByIdUseCase } from './get-user-by-id.usecase';
import { User } from '../entity/user.entity';

describe('GetUserByIdUseCase', () => {
  let getUserByIdUseCase: GetUserByIdUseCase;
  const mockUserRepository = {
    findById: jest.fn(),
  };

  beforeEach(() => {
    getUserByIdUseCase = new GetUserByIdUseCase(mockUserRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar um usuário quando encontrado', async () => {
    const user: User = { id: 1, name: 'Test', email: 'test@example.com' };
    mockUserRepository.findById.mockResolvedValue(user);

    const result = await getUserByIdUseCase.execute(1);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(user);
  });

  it('deve retornar null quando o usuário não for encontrado', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const result = await getUserByIdUseCase.execute(999);

    expect(mockUserRepository.findById).toHaveBeenCalledWith(999);

    expect(result).toBeNull();
  });
});
