import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LocalCredentials {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
