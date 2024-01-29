import { PrismaService } from 'src/database/prisma.service';
import { UserRepository } from '../user-repository';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class PrismaCreateUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(name: string, email: string, password: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findMany(): Promise<any[]> {
    return this.prisma.user.findMany({
      select: { name: true, email: true },
    });
  }

  async findUserId(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user || null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
