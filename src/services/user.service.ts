import { Injectable } from '@nestjs/common';
import { DuplicateEmailError } from '../errors/duplicate-email-error';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserRepository } from 'src/repositories/user-repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  async createUser(name: string, email: string, password: string) {
    if (!name || !email || !password) {
      throw new Error('Invalid credentials.');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new DuplicateEmailError();
    }

    return this.userRepository.create(name, email, password);
  }

  async loginUser(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new Error('Invalid credentials.');
    }

    const token = await this.authService.login(user);
    return { access_token: token };
  }

  async getUsers() {
    const users = await this.userRepository.findMany();

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('No registered users');
    }

    return users;
  }

  async deleteUser(userId: number) {
    const existingUser = await this.userRepository.findUserId(userId);
    if (!existingUser) {
      throw new Error('User not found. Cannot delete.');
    }
    return this.userRepository.delete(userId);
  }
}
