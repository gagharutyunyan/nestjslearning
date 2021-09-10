import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
    constructor(private UserRepository: UserRepository) {}
    signUp(authDto: AuthDto): Promise<UserEntity> {
        return this.UserRepository.signUp(authDto);
    }
}
