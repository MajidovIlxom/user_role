import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add_role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guards';
import { User } from './Models/user.model';
import { UserSelfGuards } from 'src/guards/user.self.guards';
import { Roles } from 'src/decorators/roles-decorators';
import { RolesGuard } from 'src/guards/roles.guards';

@ApiTags('Foydalanuvchilar')
// @Roles('USER')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: "Foydalanuvchi yaratish"})
  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({summary: "Foydalanuvchilarni kurish"})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({summary: "Foydalanuvchilarni kurish"})
  @UseGuards(UserSelfGuards)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }
  
  @ApiOperation({summary:"Update user by id"})
  @UseGuards(UserSelfGuards)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }



  @HttpCode(200)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('add_role')
  add_role(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRloes(addRoleDto);
  }

  @HttpCode(200)
  @Roles('ADMIN')
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.removeRoles(addRoleDto);
  }

  @HttpCode(200)
  @Post('activate')
  activate_user(@Body() activateUserDto: ActivateUserDto) {
    return this.userService.activeteUser(activateUserDto);
  }
}
