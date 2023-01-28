import jwtDecode from 'jwt-decode'
import { JwtPayload } from '../web/api/dto/jwtPayload'
import { Tokens } from '../web/api/dto/token.pair'

const REFRESH_TOKEN_KEY = 'refresh_token'

export class GlobalState {
  private userId: number
  private tokens: Tokens

  constructor(private origin: Storage) {
    this.userId = 0
    this.tokens = new Tokens(
      '',
      JSON.parse(localStorage.getItem(REFRESH_TOKEN_KEY) || '""') as string,
    )
  }

  getUserId(): number {
    const payload = jwtDecode(this.tokens.refresh) as JwtPayload
    return payload.sub
  }

  getTokens(): Tokens {
    return this.tokens
  }

  setTokens(tokens: Tokens): void {
    console.log(tokens)
    this.tokens = tokens
    this.origin.setItem(REFRESH_TOKEN_KEY, `"${this.tokens.refresh}"`)
  }
}

export const globalState = new GlobalState(localStorage)
