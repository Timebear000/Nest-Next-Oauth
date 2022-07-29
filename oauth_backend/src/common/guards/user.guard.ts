// import { AuthService } from './../../auth/auth.service';
// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// @Injectable()
// export class UserAuthGuard implements CanActivate {
//   constructor(private readonly authService: AuthService) {}
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.header('x-token');
//     if (!token) return false;

//     const user = await this.validateToken(token);
//     if (!user) return false;
//     request.user = user;
//     return true;
//   }

//   async validateToken(token: string) {
//     // Token으로 검색
//     return await this.authService.validateToken(token);
//   }
// }
