import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUser } from './../dtos/create-user-body';
import { UserService } from './../services/user.service';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post('user')
  async createUser(@Body() body: CreateUser) {
    const { name, email, password } = body;

    await this.userService.createUser(name, email, password);
    return { message: 'User created successfully!' };
  }

  @Post('login')
  async loginUser(@Body() body: any) {
    const { email, password } = body;

    const tokenResponse = await this.userService.loginUser(email, password);
    return tokenResponse;
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string) {
    const numericId = Number(id);
    await this.userService.deleteUser(numericId);
  }
}
