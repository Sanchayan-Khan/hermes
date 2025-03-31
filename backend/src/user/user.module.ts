import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'lib/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // Import JwtModule with your configuration. The secret should come from your env.
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
