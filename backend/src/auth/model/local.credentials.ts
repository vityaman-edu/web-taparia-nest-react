import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LocalCredentials {
  @IsEmail()
  readonly email: string

  @Transform(({ value }) =>
    typeof value != 'string' || value.includes(' ') ? undefined : value,
  )
  @IsNotEmpty()
  @IsString()
  readonly password: string
}
