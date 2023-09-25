import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from './dto/logindto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Login API")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: "Registeratsiya qilish"})
  @Post("/register")
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.registertion(createAuthDto)
  }

  @ApiOperation({summary: "Login qilish"})
  @HttpCode(200)
  @Post("login")
  createlogin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

}