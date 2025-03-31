import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/User.dto';
import { LoginValidator } from './dto/Login.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  signup(@Body() userDTO: UserDTO) {
    return this.userService.signUp(userDTO);
  }

  @Post('/login')
  login(@Body() loginDTO: LoginValidator) {
    return this.userService.login(loginDTO);
  }
}
