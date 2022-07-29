import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const Start = Date.now();
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method}  ${res.statusCode} ${req.originalUrl} +${
          Date.now() - Start
        }ms`,
      );
    });
    next();
  }
}
