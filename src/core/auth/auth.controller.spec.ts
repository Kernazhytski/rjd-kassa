import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/request/register-request.dto';
import { TokenResponseDto } from './dto/response/token-response.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should call AuthService.login with correct arguments', async () => {
      const dto: RegisterRequestDto = { login: 'test', password: '123' };
      const tokenResponse: TokenResponseDto = {
        token: 'test-token',
      };

      jest.spyOn(service, 'login').mockResolvedValue(tokenResponse);

      const result = await controller.login(dto);

      expect(service.login).toHaveBeenCalledWith(dto);
      expect(result).toEqual(tokenResponse);
    });

    it('should throw an exception if service throws', async () => {
      const dto: RegisterRequestDto = { login: 'test', password: '1234' };

      jest.spyOn(service, 'login').mockRejectedValue(new Error('Test Error'));

      await expect(controller.login(dto)).rejects.toThrow('Test Error');
    });
  });

  describe('register', () => {
    it('should call AuthService.register with correct arguments', async () => {
      const dto: RegisterRequestDto = { login: 'test_2', password: '1234' };
      const tokenResponse: TokenResponseDto = { token: 'test-token' };

      jest.spyOn(service, 'register').mockResolvedValue(tokenResponse);

      const result = await controller.register(dto);

      expect(service.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual(tokenResponse);
    });
  });
});
