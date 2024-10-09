import { LogicExceptionList } from './types/logic-exceptions.enum';

type LogicExceptionBody = {
  httpStatusCode: number;
  message: string;
};

type LogicExceptionType = {
  [key in LogicExceptionList]: LogicExceptionBody;
};

export const Exceptions: LogicExceptionType = {
  [LogicExceptionList.UnauthorizedAccess]: {
    httpStatusCode: 401,
    message: 'Неверный токен',
  },
  [LogicExceptionList.LoginExist]: {
    httpStatusCode: 403,
    message: 'Данный логин уже существует',
  },
  [LogicExceptionList.UserNotExist]: {
    httpStatusCode: 400,
    message: 'Пользователь не существует',
  },
  [LogicExceptionList.PasswordDontMatch]: {
    httpStatusCode: 403,
    message: 'Неверный пароль',
  },
  [LogicExceptionList.NoPlaces]: {
    httpStatusCode: 403,
    message: 'Недостаточно мест',
  },
  [LogicExceptionList.UserIsNotRegistred]: {
    httpStatusCode: 403,
    message: 'Пользователь не заполнен',
  },
  [LogicExceptionList.SheduleIsWrong]: {
    httpStatusCode: 409,
    message: 'Шаблон некорректен',
  },
};
