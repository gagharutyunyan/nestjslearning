import { Transform } from 'class-transformer';
import { NotAcceptableException } from '@nestjs/common';

export const ToBoolean = () => {
    return Transform(({ value }) => {
        if (typeof value !== 'string' && typeof value !== 'boolean') {
            throw new NotAcceptableException('Please type the correct value');
        }
        if (typeof value === 'boolean') {
            return value;
        }
        if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
            return true;
        }
        if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
            return false;
        }
        return undefined;
    });
};
