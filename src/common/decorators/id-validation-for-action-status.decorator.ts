// import { ValidationOptions, buildMessage, registerDecorator, ValidationArguments} from 'class-validator';
import { ActionStatusDto } from 'common/action-status/action-status.dto';
import { DataActionStatus } from 'common/action-status/data-action-status.enum';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'validateCustomIdForActionStatus', async: false })
export class ValidateCustomIdForActionStatus
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const { object } = args;
    const { action_status } = object as ActionStatusDto;

    if (!value) {
      if (action_status === DataActionStatus.CREATE) {
        return true;
      } else {
        return false;
      }
    }

    if (typeof value !== 'string') {
      return false;
    }

    if (!value.match(/^\d*$/)) {
      return false;
    }

    if (
      action_status === DataActionStatus.UPDATE ||
      action_status === DataActionStatus.DB ||
      action_status === DataActionStatus.DELETE
    ) {
      return true;
    }

    return false;
  }

  defaultMessage() {
    return 'id is required for UPDATE, DELETE, DB action status.';
  }
}

export function IdValidationForActionStatus(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'idValidationForActionStatus',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ValidateCustomIdForActionStatus,
    });
  };
}
