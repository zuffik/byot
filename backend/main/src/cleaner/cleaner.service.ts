import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Token } from '../user/token/token.entity';

@Injectable()
export class CleanerService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  public async removeUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      await this.tokenRepository.delete({ user: { id: user.id } });
      await this.userRepository.remove(user);
    }
  }
}
