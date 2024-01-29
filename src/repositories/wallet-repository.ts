import { Wallet } from '@prisma/client';

export abstract class WalletRepository {
  abstract create(userId: number): Promise<Wallet>;

  abstract findWalletByUserId(userId: number): Promise<Wallet | null>;

  abstract updateWalletBalance(
    userId: number,
    newBalance: number,
  ): Promise<Wallet | null>;
}
