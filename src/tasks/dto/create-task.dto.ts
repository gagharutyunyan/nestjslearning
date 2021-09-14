import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ToBoolean } from './transformers';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly color: string;

    @IsOptional()
    @ToBoolean()
    readonly isChecked: boolean;
}
