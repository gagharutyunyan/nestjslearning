import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
    @IsString()
    @MinLength(5)
    @MaxLength(15)
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password is too week',
    })
    readonly password: string;
}
