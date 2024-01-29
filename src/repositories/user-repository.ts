import { User } from '@prisma/client';

export abstract class UserRepository {
  abstract create(name: string, email: string, password: string): Promise<User>;

  abstract findMany(): Promise<any>;

  abstract findUserId(id: number): Promise<User>;

  abstract findByEmail(email: string): Promise<User>;

  abstract delete(id: number): Promise<void>;
}
