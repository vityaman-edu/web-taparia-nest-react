import { AuthGuard } from '@nestjs/passport'
import { jwtRefrestTokenStrategy } from '../jwt/refresh.token.strategy'

export class RefreshTokenGuard extends AuthGuard(jwtRefrestTokenStrategy) {}
