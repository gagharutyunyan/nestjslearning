import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { Request } from 'express';
import { UserEntity } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() authDto: AuthDto): Promise<UserEntity> {
        return this.authService.signUp(authDto);
    }

    @Post('signin')
    signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(signInDto);
    }

    @Post('user')
    @UseGuards(AuthGuard())
    currentUser(@Req() request: Request) {
        console.log(request);
    }
}
