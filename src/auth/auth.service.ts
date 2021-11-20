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
    async signUp(authDto: AuthDto): Promise<{ accessToken: string }> {
        try {
            const user = await this.userRepository.signUp(authDto);
            return { accessToken: this.generateJWT(user) };
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

    async getUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
    async getUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ id });
    }

    generateJWT(user: UserEntity): string {
        const { id, username } = user;
        return this.jwtService.sign({ id, username });
    }
}
