import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class BigIntValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (
      (metadata.type === 'param' || metadata.type === 'query') &&
      !(value as string).match(/^\d+$/)
    ) {
      throw new BadRequestException(
        `Неверный формат параметра ${metadata.data}`,
      );
    }
    return value;
  }
}
