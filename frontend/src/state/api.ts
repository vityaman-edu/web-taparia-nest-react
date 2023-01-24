import { TokenPair } from '../web/api/dto/token.pair'
import { HttpApi } from '../web/api/httpApi'
import { RefreshingTokenApi } from '../web/api/refreshingTokenApi'

let tokenPair: TokenPair = new TokenPair('', '')
const tokens = () => tokenPair
export const setTokens = (tks: TokenPair) => {
  tokenPair = tks
}
export const api = new RefreshingTokenApi(
  new HttpApi('http://localhost:3333', 1500, tokens),
  setTokens,
)


