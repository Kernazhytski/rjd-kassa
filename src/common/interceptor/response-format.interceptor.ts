import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetaList } from './types/meta.enum';
import { ResponseCustomType } from './types/response.type';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const reqMethod = Object.keys(context.switchToHttp().getRequest().route.methods)[0];

    return next.handle().pipe(
      map((data) => {
        const responseData = data ? data : {};
        const metaMessage = this.cls.get('metaMessage');
        const meta = metaMessage ? metaMessage : MetaList[`${reqMethod}`];
        const response: ResponseCustomType = Array.isArray(data)
          ? {
              data: { content: responseData },
              meta: meta,
            }
          : { data: responseData, meta: meta };

        return response;
      })
    );
  }
}
