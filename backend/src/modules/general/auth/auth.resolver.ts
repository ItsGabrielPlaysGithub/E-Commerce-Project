import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './responses/login.response';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Mutation(() => LoginResponse, { name: 'login' })
    async login(
        @Args('emailAddress') emailAddress: string,
        @Args('password') password: string,
        @Context('res') res: Response,
    ): Promise<LoginResponse> {
        const users = await this.authService.validateUser(emailAddress, password);

        if (!users) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.authService.login(users);
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        const cookieDomain = this.configService.get<string>('AUTH_COOKIE_DOMAIN');

        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            ...(cookieDomain ? { domain: cookieDomain } : {}),
        });
        res.setHeader('Cache-Control', 'no-store');

        return {
            message: 'Login successful',
        };
    }

    @Mutation(() => LoginResponse, { name: 'logout' })
    logout(@Context('res') res: Response): LoginResponse {
        const isProduction = this.configService.get<string>('NODE_ENV') === 'production';
        const cookieDomain = this.configService.get<string>('AUTH_COOKIE_DOMAIN');

        res.clearCookie('access_token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            path: '/',
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