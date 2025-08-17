import { Controller, Post, UseGuards, Body, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from 'src/common/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUser(@Req() request) {
    const uid = request.user.uid;
    return this.userService.getUser(uid);
  }
}
