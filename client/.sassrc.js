import { resolve } from 'path';

export const includePaths = [
    resolve(__dirname, './node_modules'),
    resolve(__dirname, '../../node_modules'),
    resolve(__dirname, '../../../../node_modules'),
];