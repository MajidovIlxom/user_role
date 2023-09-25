import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './Models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add_role.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User, 
  private readonly roleService: RolesService){}
  
  
  
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    const role = await this.roleService.findOne("ADMIN")
    // const newRole = await this.roleService.findOne("USER")

    if (!role) {
      throw new BadRequestException("Role not found")
    }
    await newUser.$set('roles', [role.id])
    await newUser.save()
    newUser.roles = [role]
    return newUser;
  }

  findAll() {
    const user =  this.userRepo.findOne({include: {all: true}}) 
    return user
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {email},
      include: {all: true},
    })
    return user
  }

  async addRloes(addRolesDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRolesDto.userId)
    const role = await this.roleService.findOne(addRolesDto.value)
    console.log('role: ', role);
    if (role && user){
      await user.$add('roles', role.id)
      const updateUser = this.roleService.findByPk(addRolesDto.userId, {
        include: { all: true }
      })
      return updateUser
    }
    throw new HttpException(
      "Foydalanuvchi yoki role topilmadi",
      HttpStatus.NOT_FOUND
    )
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {id},
      include: {all: true},
    })
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepo.destroy({where: {id}});
    if(!user){
      throw new HttpException("Foydalanuvchi topilmadi",HttpStatus.NOT_FOUND)
    }
    return {message: "Foydalanuvchi o'chirildi"};
  }

  async removeRoles(addRolesDto: AddRoleDto) {
    const user = await this.userRepo.findByPk(addRolesDto.userId)
    const role = await this.roleService.findOne(addRolesDto.value)
    if (role && user){
      await user.$remove('roles', role.id)
      const updateUser = await this.roleService.findByPk(addRolesDto.userId,{
        include: {all: true}
      })
      return updateUser
    }
    throw new HttpException(
      "Foydalanuvchi yoki role topilmadi",
      HttpStatus.NOT_FOUND
    )
  }
  async activeteUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepo.findByPk(activateUserDto.userId)
    if (!user){
      throw new HttpException("Foydalanuvchi topilmadi",HttpStatus.NOT_FOUND)
      }
    user.is_active = true;
    await user.save();
    return user;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const upd = await this.userRepo.update(updateUserDto,{where:{id},returning:true})
    return upd[1][0];  }

}
