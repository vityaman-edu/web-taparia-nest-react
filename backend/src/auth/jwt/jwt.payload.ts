import { IsInt, IsPositive } from 'class-validator'

export class JwtPayload {
  @IsPositive()
  @IsInt()
  readonly sub: number
}
