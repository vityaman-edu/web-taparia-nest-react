import { IsEmail, IsInt, IsPositive } from 'class-validator'

export class JwtPayload {
  @IsPositive()
  @IsInt()
  readonly sub: number

  @IsEmail()
  readonly email: string
}
