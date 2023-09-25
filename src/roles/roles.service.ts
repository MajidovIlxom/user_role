import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './Models/role.model';

@Injectable()
export class RolesService {
  findByPk(userId: number, arg1: { include: { all: boolean; }; }) {
    throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Role) private roleRepo: typeof Role){}
  create( createRoleDto: CreateRoleDto) {
    const newRole =  this.roleRepo.create(createRoleDto)
    return newRole;
  }

  findAll() {
    const newRole =  this.roleRepo.findOne({include: {all: true}}) 
    return newRole
  }

  findOne(value: string) {
    const newRole =  this.roleRepo.findOne({where: {value} })

    return newRole; 
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
