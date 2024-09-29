import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login() {
    return this.generateToken('1234');
  }

  async generateToken(userId: string) {
    const payload = { userId };
    return this.jwtService.signAsync(payload);
  }
}
