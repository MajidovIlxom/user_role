import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("rolelar")
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({summary: "Rollarni qushish"})
  @Post("create")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({summary: "Rollarni hammasini kurish"})
  @Get("all")
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({"summary": "Rollarni ID si bilan kurish"})
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.rolesService.findOne(value);
  }

  @ApiOperation({summary: "Rollarni uazgartirish(update)"})
  @Patch('update:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @ApiOperation({summary: "Rollarni o'chirish"})
  @Delete('remove:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
