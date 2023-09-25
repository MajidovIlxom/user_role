import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/Models/user.model';
import { LoginDto } from './dto/logindto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServer: UserService,
    private readonly jwtService: JwtService
    ){}

    async registertion(userDto: CreateUserDto) {
      const condedate = await this.userServer.getUserByEmail(userDto.email)
      if (condedate) {
        throw new HttpException("bunday foydalanuvchi mavjud",HttpStatus.BAD_REQUEST)
      }
      const hashedpassword = await bcrypt.hash(userDto.password, 7)
      const user = await this.userServer.create({
        ...userDto,
        password: hashedpassword,
      })
      return this.genereteToken(user)
    }

    private async genereteToken(user: User){
      const payload = {email: user.email, id: user.id, name: user.name}
      return { token: this.jwtService.sign(payload)}
    }
  
    async login(loginDto: LoginDto){
      const user = await this.valedateUser(loginDto)
      if (!user){
        throw new UnauthorizedException("Email yoki Parol xato")
      }
      return this.genereteToken(user)
    }

  private async valedateUser(loginDto: LoginDto){
    const user = await this.userServer.getUserByEmail(loginDto.email)
    if (!user){
      throw new UnauthorizedException("Email yoki Parol xato")
    }
    const validpassword = await bcrypt.compare(loginDto.password,user.password)
  
  if(validpassword){
    return user
  }
  throw new UnauthorizedException("Email yoki Parol xato")
  }


}
