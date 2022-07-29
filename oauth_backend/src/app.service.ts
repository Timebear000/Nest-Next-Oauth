import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
  getHello(): string {
    return 'toekn';
  }

  // *  토큰 발급
  getSignedJWTAccessToken(id: string) {
    return jwt.sign(
      {
        id: id,
      },
      '1234',
      {
        expiresIn: '3m',
      },
    );
  }
  // * 리플래시 토큰 발급
  getSignedJWTRefreshoken(id: string) {
    return jwt.sign(
      {
        id: id,
      },
      '1122',
      {
        expiresIn: '1h',
      },
    );
  }
}
