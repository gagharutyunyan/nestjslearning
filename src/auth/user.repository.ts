import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/signIn.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    async signUp(authDto: AuthDto): Promise<UserEntity> {
        const user = new UserEntity();
        Object.assign(user, authDto);
        return await user.save();
    }

    async getUser(signInDto: SignInDto): Promise<UserEntity> {
        const { username, email } = signInDto;
        const query = this.createQueryBuilder('user');
        const getUser = query.where('username = :username OR email = :email', { username, email });

        return await getUser.getOne();
    }
}
