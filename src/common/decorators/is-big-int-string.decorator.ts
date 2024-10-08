import {
  ValidationOptions,
  buildMessage,
  registerDecorator,
} from 'class-validator';

export function IsBigIntString(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBigIntString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          const typedValue: string = value;
          return !!typedValue.match(/^\d*$/);
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix}$property must be a valid bigint string`,
          validationOptions,
        ),
      },
    });
  };
}
