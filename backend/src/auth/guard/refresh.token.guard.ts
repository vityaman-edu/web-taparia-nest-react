import { AuthGuard } from '@nestjs/passport'
import { JWT_REFRESH_TOKEN_STRATEGY } from '../jwt/refresh.token.strategy'

export class RefreshTokenGuard extends AuthGuard(JWT_REFRESH_TOKEN_STRATEGY) {}
