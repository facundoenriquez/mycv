import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // Check if email exists
    const users = await this.usersService.find(email);
    if (users.length) throw new Error('Email already exists');
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    // Create a new user
    const user = await this.usersService.create(email, hashedPassword);
    // Return the created user
    return user;
  }

  async signin(email: string, password: string) {
    // Check if email exists
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('Email not found');
    return user;
  }
}
