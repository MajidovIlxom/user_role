import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/Models/role.model';
import { User } from './user/Models/user.model';
import { UserRole } from './roles/Models/user-role-model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.POSTGREST_HOST,
      port:Number(process.env.POSTGREST_PORT),
      username: process.env.POSTGREST_USER,
      password: String(process.env.POSTGREST_PASSWORD),
      database: process.env.POSTGREST_DB,
      models:[Role, User, UserRole],
      autoLoadModels: true,
      logging: true,  
    }),
    UserModule,
    RolesModule,
    AuthModule,
  ],

})
export class AppModule {}
