import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from './user.entity';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from './types/userResponse.interface';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) {}
    async signUp(authDto: AuthDto): Promise<UserResponseInterface> {
        try {
            const user = await this.userRepository.signUp(authDto);
            return this.buildUserResponse(user);
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException(e.detail);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(signInDto: SignInDto): Promise<string> {
        const { password } = signInDto;
        const user = await this.userRepository.login(signInDto);
        if (user && (await compare(password, user.password))) {
            return user.username;
        } else {
            throw new UnauthorizedException();
        }
    }

    generateJWT(user: UserEntity): string {
        const { id, username } = user;
        return sign({ id, username }, '23');
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJWT(user),
            },
        };
    }
}
