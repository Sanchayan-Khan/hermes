import {
  IsEmail,
  Matches,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class UserDTO {
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(128)
  hash_password: string;
}
