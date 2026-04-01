import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './responses/login.response';
import {
  UnauthorizedException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RateLimitService } from './services/rate-limit.service';
import { BruteForceService } from './services/brute-force.service';
import { getClientIp } from './services/get-client-ip';
import type { Response, Request } from 'express';

function secondsToReadable(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

@Resolver()
export class AuthResolver implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly rateLimitService: RateLimitService,
    private readonly bruteForceService: BruteForceService,
  ) {}

  onModuleInit() {
    // Cleanup expired entries every 5 minutes
    setInterval(
      () => {
        this.rateLimitService.cleanup();
        this.bruteForceService.cleanup();
      },
      5 * 60 * 1000,
    );
  }

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(
    @Args('emailAddress') emailAddress: string,
    @Args('password') password: string,
    @Context('req') req: Request,
    @Context('res') res: Response,
  ): Promise<LoginResponse> {
    const clientIp = getClientIp(req);

    // Rate limiting: global per IP
    const ipRateLimit = this.rateLimitService.check(
      `login:ip:${clientIp}`,
      20,
      15 * 60 * 1000,
    );
    if (!ipRateLimit.allowed) {
      const readableTime = secondsToReadable(ipRateLimit.retryAfter!);
      throw new BadRequestException(
        `Too many login attempts from your IP. Please try again in ${readableTime}.`,
      );
    }

    // Rate limiting: per email
    const emailRateLimit = this.rateLimitService.check(
      `login:email:${emailAddress}`,
      5,
      15 * 60 * 1000,
    );
    if (!emailRateLimit.allowed) {
      const readableTime = secondsToReadable(emailRateLimit.retryAfter!);
      throw new BadRequestException(
        `Too many login attempts for this email. Please try again in ${readableTime}.`,
      );
    }

    // Brute force check: per email
    const brfKey = `login:brute:${emailAddress}`;
    const isLocked = this.bruteForceService.isLocked(brfKey);
    if (isLocked.locked) {
      const readableTime = secondsToReadable(
        Math.ceil(isLocked.remainingMs! / 1000),
      );
      throw new BadRequestException(
        `This account is temporarily locked due to too many failed attempts. Please try again in ${readableTime}.`,
      );
    }

    // Validate credentials
    const users = await this.authService.validateUser(emailAddress, password);

    if (!users) {
      // Record failed attempt and apply progressive delay
      const failure = this.bruteForceService.recordFailure(brfKey);

      if (failure.delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, failure.delay));
      }

      throw new UnauthorizedException('Invalid credentials');
    }

    // Clear brute force on successful login
    this.bruteForceService.clearFailures(brfKey);
    this.rateLimitService.reset(`login:ip:${clientIp}`);
    this.rateLimitService.reset(`login:email:${emailAddress}`);

    const accessToken = await this.authService.login(users);
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const cookieDomain = this.configService.get<string>('AUTH_COOKIE_DOMAIN');

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax', // 'lax' allows cookies on top-level redirects (PayMongo callback)
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      domain: isProduction ? '.synchores.com' : undefined, // Set domain for production so cookies work across subdomains
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });
    res.setHeader('Cache-Control', 'no-store');

    return {
      message: 'Login successful',
    };
  }

  @Mutation(() => LoginResponse, { name: 'logout' })
  logout(@Context('res') res: Response): LoginResponse {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const cookieDomain = this.configService.get<string>('AUTH_COOKIE_DOMAIN');

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax', // 'lax' allows cookies on top-level redirects (PayMongo callback)
      path: '/',
      domain: isProduction ? '.synchores.com' : undefined, // Set domain for production so cookies work across subdomains
      ...(cookieDomain ? { domain: cookieDomain } : {}),
    });
    res.setHeader('Cache-Control', 'no-store');

    return {
      message: 'Logout successful',
    };
  }

  // Query for signup
  // @Mutation(() => UsersTbl)
  // async register(@Args('input') input: LoginDto){
  //     const user = await this.authService.signUp(input);
  //     return user;
  // }
}
