import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body() authDto: AuthDto): Promise<UserResponseInterface> {
        return this.authService.signUp(authDto);
    }

    @Post('signin')
    signIn(@Body() signInDto: SignInDto): Promise<string> {
        return this.authService.signIn(signInDto);
    }
}
