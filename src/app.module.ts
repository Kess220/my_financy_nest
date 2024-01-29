// app.module.ts
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserController } from './controllers/user.controller';
import { WalletController } from './controllers/wallet.controller';
import { PrismaService } from './database/prisma.service';
import { PrismaCreateUserRepository } from './repositories/prisma/prisma-user-repository';
import { UserService } from './services/user.service';
import { WalletService } from './services/wallet.service';
import { PrismaCreateWalletRepository } from './repositories/prisma/prisma-wallet-repository';
import { UserRepository } from './repositories/user-repository';
import { WalletRepository } from './repositories/wallet-repository';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UserController, WalletController],
  providers: [
    AuthMiddleware,
    PrismaService,
    UserService,
    {
      provide: UserRepository,
      useClass: PrismaCreateUserRepository,
    },
    WalletService,
    {
      provide: WalletRepository,
      useClass: PrismaCreateWalletRepository,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.ALL },
        { path: 'login', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}
