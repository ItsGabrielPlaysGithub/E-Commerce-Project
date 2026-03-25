import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.getArgByIndex(2);
    const request = ctx?.req;

    if (!request) {
      console.error('[JwtAuthGuard] No request found in context');
      throw new UnauthorizedException('Invalid request context');
    }

    const token = this.extractTokenFromRequest(request);

    if (!token) {
      console.error('[JwtAuthGuard] No token found in request');
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      // Also set user on context for GraphQL access
      ctx.user = payload;
      return true;
    } catch (error) {
      console.error(
        '[JwtAuthGuard] Token verification failed:',
        error instanceof Error ? error.message : error,
      );
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromRequest(request: any): string | null {
    // Check Authorization header first
    const authHeader = request.headers?.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Check cookies
    if (request.cookies?.access_token) {
      return request.cookies.access_token;
    }

    return null;
  }
}
