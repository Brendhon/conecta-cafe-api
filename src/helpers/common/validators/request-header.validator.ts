import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { validateOrReject } from 'class-validator';
export const RequestHeader = createParamDecorator(
  async (value: any, ctx: ExecutionContext) => {
    // extract headers
    const headers = ctx.switchToHttp().getRequest().headers;

    // Convert headers to DTO object
    const dto = plainToClass(value, headers, { excludeExtraneousValues: true });

    // Validate
    return validateOrReject(dto)
      .then(() => dto)
      .catch(() => {
        throw new ForbiddenException('Missing Authorization Header');
      });
  },
);
