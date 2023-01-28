import { IsEmail, IsString, Matches } from 'class-validator'

export class LocalCredentials {
  @IsEmail()
  readonly email: string

  @IsString()
  @Matches(/[a-zA-Z0-9_-]{4,32}/, {
    message:
      'Password must contain only uppercase or lowercase ' +
      "english letters, digits and characters '-' or '_'",
  })
  readonly password: string
}
