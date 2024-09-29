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
};
