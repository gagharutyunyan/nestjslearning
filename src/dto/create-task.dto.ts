import { IsNotEmpty, IsOptional } from 'class-validator';
import { ToBoolean } from './transformers';

export class CreateTaskDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly color: string;

    @IsOptional()
    @ToBoolean('create')
    readonly isChecked: boolean;
}
