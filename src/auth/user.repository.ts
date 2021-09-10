import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthDto } from './dto/auth.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async signUp(authDto: AuthDto): Promise<UserEntity> {
        const user = new UserEntity();
        Object.assign(user, authDto);
        return await user.save();
    }
}
