import { Body, Controller, Post, Param, Get, Put } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post(':userId')
  async createWallet(@Param('userId') userId: number) {
    const userIdNumber = Number(userId);
    await this.walletService.createWallet(userIdNumber);
    return { message: 'Wallet created successfully!' };
  }

  @Get(':userId')
  async getWallet(@Param('userId') userId: number) {
    const userIdNumber = Number(userId);
    const wallet = await this.walletService.getWallet(userIdNumber);
    return wallet;
  }

  @Put(':userId')
  async updateWallet(
    @Param('userId') userId: number,
    @Body('newBalance') newBalance: number,
  ) {
    const userIdNumber = Number(userId);

    return this.walletService.updateWalletBalance(userIdNumber, newBalance);
  }
}
