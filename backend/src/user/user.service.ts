import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserDTO } from './dto/User.dto';
import { compare, hash } from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'lib/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginValidator } from './dto/Login.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(userObject: UserDTO) {
    const { hash_password: plainPassword, email, username } = userObject;

    // Check if a user already exists with the same email or username
    const existingUser = await this.findAll({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser.length) {
      throw new HttpException(
        'User with the same email or username already exists',
        HttpStatus.FORBIDDEN,
      );
    }

    // Validate that a valid plain text password is provided
    if (!plainPassword || typeof plainPassword !== 'string') {
      throw new HttpException(
        'Invalid password provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    let hashedPassword: string;
    try {
      hashedPassword = await hash(plainPassword, 10);
    } catch (err) {
      this.logger.error('Error hashing password:', err);
      throw new HttpException(
        'Error processing password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // If no role is provided, default to BUYER
    userObject = {
      ...userObject,
      hash_password: hashedPassword,
    };

    try {
      const newUser = await this.prisma.user.create({ data: userObject });
      if (newUser) {
        // Automatically log the user in by calling login
        return this.login({ identifier: email, password: plainPassword });
      } else {
        throw new HttpException(
          'User creation failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (error) {
      this.logger.error('Signup error:', error);
      throw new HttpException(
        'Database error during signup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Login: verifies credentials, generates tokens, and returns them.
  async login(loginObject: LoginValidator) {
    const { identifier, password } = loginObject;

    const findUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await compare(password, findUser.hash_password);
    if (!isValidPassword) {
      this.logger.warn(`Invalid credentials for user: ${identifier}`);
      throw new HttpException('Invalid credentials', HttpStatus.FORBIDDEN);
    }

    // Include the user's role in the token payload.
    const payload = {
      userId: findUser.id,
      username: findUser.username,
    };

    let accessToken: string, refreshToken: string;
    try {
      accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    } catch (error) {
      this.logger.error('Error generating tokens:', error);
      throw new HttpException(
        'Token generation error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const hashedRefreshToken = await hash(refreshToken, 10);
      await this.prisma.user.update({
        where: { id: findUser.id },
        data: { refreshToken: hashedRefreshToken },
      });
    } catch (error) {
      this.logger.error('Error storing refresh token:', error);
      throw new HttpException(
        'Error storing refresh token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { accessToken, refreshToken };
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      this.logger.error('Error fetching users:', error);
      throw new HttpException(
        'Error fetching users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
