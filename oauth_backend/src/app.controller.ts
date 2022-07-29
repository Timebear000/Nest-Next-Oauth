import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private users = [
    {
      id: '113641787525880770872',
      name: 'Yohwan Kim',
      email: 'timebear000@gmail.com',
      image:
        'https://lh3.googleusercontent.com/a-/AFdZucqGa2RdKzvFg6BeSn0xa-fhhZswIKxEzcVU4Vjh=s96-c',
      provider: 'google',
      providerId: '113641787525880770872',
    },
  ];

  @Post()
  getHello(@Body() body): string {
    console.log(body);
    return this.appService.getHello();
  }

  @Get('/users')
  getUsers() {
    return this.users;
  }
  @Post('/oauth/refresh')
  refreshToken(@Body() body) {
    const { token } = body;
    if (!token) return {};
    console.log(token);
    const decode = jwt.verify(token, '1122');
    console.log(decode);

    const findIndex = this.users.findIndex((e) => e.id == decode.id);
    const user = this.users[findIndex];
    console.log(`${user.name} Refresh`);
    return {
      user: user,
      access_token: this.appService.getSignedJWTAccessToken(decode.id),
      refresh_token: this.appService.getSignedJWTRefreshoken(decode.id),
    };
  }

  @Get('/oauth/userInfo/:token')
  MyInfo(@Param('token') token: string) {
    const decode = jwt.verify(token, '1234');
    const findIndex = this.users.findIndex((e) => e.id == decode.id);
    const user = this.users[findIndex];
    return user;
  }

  @Post('/oauth/login')
  Login(@Body() body) {
    const { id } = body;
    console.log(body);
    const findIndex = this.users.findIndex((e) => e.id == id);
    if (findIndex == -1) {
      console.log(`${body.name} Sinpup`);
      this.users.push(body);
    } else {
      console.log(`${body.name} Login`);
    }
    const isuse = this.users.findIndex((e) => e.id == id);
    const user = this.users[isuse];
    return {
      user: user,
      access_token: this.appService.getSignedJWTAccessToken(id),
      refresh_token: this.appService.getSignedJWTRefreshoken(id),
    };
  }
}
