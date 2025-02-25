import { DeleteUserUseCase } from './delete-user.usecase';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  const mockUserRepository = {
    deleteUser: jest.fn(),
  };

  beforeEach(() => {
    deleteUserUseCase = new DeleteUserUseCase(mockUserRepository as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve deletar um usuário pelo ID', async () => {
    const userId = 1;

    mockUserRepository.deleteUser.mockResolvedValue(undefined);

    const result = await deleteUserUseCase.execute(userId);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);

    expect(result).toBeUndefined();
  });
});
