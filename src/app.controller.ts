import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/callback')
  handleAuthCallback(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Query('state') oauthState: string,
  ) {
    if (!oauthState) {
      throw new Error('Do not know where to redirect you');
    }
    const url = new URL(oauthState);
    Object.entries(request.query).forEach(([key, value]) =>
      url.searchParams.append(key, value as string),
    );
    response.redirect(url.toString());
  }

  @Get('/auth')
  handleInitialAuthRequest(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const authorizationUrl = request.cookies['dynaboard.authorizationUrl'];
    if (!authorizationUrl) {
      throw new Error('No authorization URL set');
    }
    response.redirect(authorizationUrl);
  }
}
