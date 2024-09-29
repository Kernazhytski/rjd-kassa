import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    if (metadata.type === 'param') {
      return value;
    }

    const obj = plainToInstance(metadata.metatype!, value, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
    });

    if (metadata.type === 'query') {
      if (typeof value !== 'object') return value;
    }

    const errors = await validate(obj, {
      forbidUnknownValues: false,
      stopAtFirstError: true,
      whitelist: true,
      validateNested: true,
    });

    if (errors.length) {
      const printError: Record<string, any> = {};
      errors.forEach((err) => {
        let errorConstrain: any = err.constraints;
        while (!errorConstrain && err.children) {
          err = err.children[0];
          errorConstrain = err.constraints;
        }
        printError[err.property] = Object.values(errorConstrain);
      });
      throw new ValidationException(printError);
    }
    return obj;
  }
}
