import { IsNotEmpty, IsOptional } from 'class-validator';
import { ToBoolean } from './transformers';

export class UpdateTaskDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty({ message: 'Գույնը պարտադիր է' })
    readonly color: string;

    @IsOptional()
    @ToBoolean()
    readonly isChecked: boolean;
}
