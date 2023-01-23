import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PrismaConfig {
  constructor(private configService: ConfigService) {}

  databaseUrl(): string {
    return this.configService.get('DATABASE_URL')
  }
}
