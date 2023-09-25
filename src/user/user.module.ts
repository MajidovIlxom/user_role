import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './Models/user.model';
import { RolesModule } from 'src/roles/roles.module';
import { Role } from 'src/roles/Models/role.model';
import { UserRole } from 'src/roles/Models/user-role-model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRole]), RolesModule,
  forwardRef(()=> AuthModule)
],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
