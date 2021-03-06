import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { UserEntity } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() authDto: AuthDto): Promise<{ accessToken: string }> {
        return this.authService.signUp(authDto);
    }

    @Post('signin')
    signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInDto);
    }

    @Get('users')
    getUsers(): Promise<UserEntity[]> {
        return this.authService.getUsers();
    }
    @Get('user/:id')
    getUser(@Param('id') id: number): Promise<UserEntity> {
        return this.authService.getUser(id);
    }
}
