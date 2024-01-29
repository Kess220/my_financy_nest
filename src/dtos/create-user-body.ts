import { IsNotEmpty, Length } from 'class-validator';

export class CreateUser {
  @IsNotEmpty({
    message: 'Username required.',
  })
  @Length(3, 20)
  name: string;
  @IsNotEmpty({
    message: 'Email required.',
  })
  email: string;
  @IsNotEmpty({
    message: 'Password required.',
  })
  @Length(5, 20)
  password: string;
  photo: string;
}
