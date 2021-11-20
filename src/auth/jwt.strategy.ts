import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret-key',
        });
    }

    async validate(payload) {
        const { id } = payload;
        const user = await this.userRepository.findOne({ id });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
