import { Transform } from 'class-transformer';

export const ToBoolean = (mode?) => {
    return Transform(({ value }) => {
        if (typeof value === 'boolean') {
            return value;
        }
        if (['true', 'on', 'yes', '1'].includes(value.toLowerCase())) {
            return true;
        }
        if (['false', 'off', 'no', '0'].includes(value.toLowerCase())) {
            return false;
        }
        return mode === 'create' ? false : undefined;
    });
};
