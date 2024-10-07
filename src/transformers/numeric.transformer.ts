import { ValueTransformer } from 'typeorm';

export const numericTransformer: ValueTransformer = {
  to: (value: number | null) => value,
  from: (value: string | null) => (value !== null ? parseFloat(value) : null),
};
