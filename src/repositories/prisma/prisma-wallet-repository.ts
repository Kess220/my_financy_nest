import { PrismaService } from 'src/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { WalletRepository } from '../wallet-repository';
import { Wallet } from '@prisma/client';

@Injectable()
export class PrismaCreateWalletRepository implements WalletRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: number): Promise<Wallet> {
    return this.prisma.$transaction(async (tx) => {
      return tx.wallet.create({
        data: {
          userId,
        },
      });
    });
  }

  async findWalletByUserId(userId: number): Promise<Wallet | null> {
    const wallet = await this.prisma.wallet.findUnique({
      where: { userId },
    });

    return wallet ?? null;
  }

  async updateWalletBalance(
    userId: number,
    newBalance: number,
  ): Promise<Wallet | null> {
    const wallet = await this.prisma.$transaction(async (tx) => {
      return tx.wallet.update({
        where: {
          userId,
        },
        data: {
          balance: newBalance,
        },
      });
    });

    return wallet ?? null;
  }
}
