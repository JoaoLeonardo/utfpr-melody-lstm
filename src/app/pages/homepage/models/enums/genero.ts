import { LabelValue } from "src/app/shared/models/label-value";

export enum Genero {
    CLASSICAL = 'Clássica',
    ROCK = 'Rock',
    POP = 'Pop',
}

export type GeneroType = keyof typeof Genero;

export function getGeneroOptions(): LabelValue[] {
    const keys = Object.keys(Genero);
    return Object.values(Genero).map((label, index) => {
        return { value: keys[index], label: label };
    });
}