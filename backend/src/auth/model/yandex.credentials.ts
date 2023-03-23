import { IsNotEmpty, IsString } from 'class-validator'

export class YandexCredentials {
  @IsString()
  @IsNotEmpty()
  token: string
}
