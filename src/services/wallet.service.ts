import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { WalletRepository } from '../repositories/wallet-repository';

@Injectable()
export class WalletService {
  constructor(private walletRepository: WalletRepository) {}

  async createWallet(userId: number): Promise<Wallet> {
    const existingWallet =
      await this.walletRepository.findWalletByUserId(userId);

    if (existingWallet) {
      throw new HttpException(
        'A Wallet already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newWallet = await this.walletRepository.create(userId);

    return newWallet;
  }

  async getWallet(userId: number): Promise<Wallet | null> {
    const wallet = await this.walletRepository.findWalletByUserId(userId);

    if (!wallet) {
      throw new HttpException(
        'Erro efetuado com sucesso',
        HttpStatus.NOT_FOUND,
      );
    }

    return wallet;
  }
  async updateWalletBalance(
    userId: number,
    newBalance: number,
  ): Promise<Wallet | null> {
    if (typeof newBalance !== 'number') {
      throw new HttpException(
        'Invalid balance value. Must be a number.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingWallet =
      await this.walletRepository.findWalletByUserId(userId);

    if (!existingWallet) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }

    const walletUpdate = await this.walletRepository.updateWalletBalance(
      userId,
      newBalance,
    );

    return walletUpdate;
  }
}
