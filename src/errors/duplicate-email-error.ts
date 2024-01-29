import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateEmailError extends HttpException {
  constructor() {
    super('This email is already registered.', HttpStatus.BAD_REQUEST);
    this.name = 'DuplicateEmailError';
  }
}
