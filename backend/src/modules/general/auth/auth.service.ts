import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersTbl } from './entity/users.tbl';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersTbl)
    private readonly usersRepo: Repository<UsersTbl>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    emailAddress: string,
    password: string,
  ): Promise<UsersTbl | null> {
    const users = await this.usersRepo.findOne({ where: { emailAddress } });

    if (!users) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, users.password);

    if (!isPasswordValid) {
      return null;
    }

    return users;
  }

  async login(users: UsersTbl): Promise<string> {
    const payload = {
      sub: users.userId,
      userId: users.userId,
      emailAddress: users.emailAddress,
      role: users.role,
    };

    return this.jwtService.signAsync(payload);
  }

  // Query for signup
  // async signUp(body: SignupDto){
  //     const hashedPassword = await bcrypt.hash(body.password, 10);

  //     const newUser = this.usersRepo.create({
  //         ...body,
  //         password: hashedPassword,
  //     });
  //     return await this.usersRepo.save(newUser);
  // }
}
