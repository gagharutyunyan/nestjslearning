import { PartialType } from '@nestjs/mapped-types';
import { AuthDto } from './auth.dto';
import { IsEmail, IsOptional } from 'class-validator';

export class SignInDto extends PartialType(AuthDto) {
    @IsOptional()
    @IsEmail()
    email: string;
}
