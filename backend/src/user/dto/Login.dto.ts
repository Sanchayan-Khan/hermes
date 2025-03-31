import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginValidator {
  @IsNotEmpty()
  identifier: string;

  @MinLength(8)
  @MaxLength(128)
  password: string;
}
