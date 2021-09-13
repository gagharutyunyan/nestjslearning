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
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private jwtService: JwtService) {}
    async signUp(authDto: AuthDto): Promise<UserEntity> {
        try {
            return await this.userRepository.signUp(authDto);
        } catch (e) {
            if (e.code === '23505') {
                throw new ConflictException(e.detail);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
        const { password } = signInDto;
        const user = await this.userRepository.getUser(signInDto);
        if (user && (await compare(password, user.password))) {
            return { accessToken: this.generateJWT(user) };
        } else {
            throw new UnauthorizedException();
        }
    }

    generateJWT(user: UserEntity): string {
        const { id, username } = user;
        return this.jwtService.sign({ id, username });
    }
}
