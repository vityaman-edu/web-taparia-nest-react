import jwtDecode from 'jwt-decode'
import { TokenPair } from '../web/api/dto/token.pair'
import { HttpApi } from '../web/api/httpApi'
import { RefreshingTokenApi } from '../web/api/refreshingTokenApi'

export const userId = () => {
  const payload = jwtDecode(refreshToken()) as any
  const userId = payload.sub
  return userId
}

export const TOKEN_KEY = 'refresh_token'
const refreshToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY) || '""')
const setRefreshToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, `"${token}"`)
}

let tokenPair: TokenPair = new TokenPair('', refreshToken())
setRefreshToken(tokenPair.refreshToken)

const tokens = () => {
  return tokenPair
}
export const setTokens = (tks: TokenPair) => {
  setRefreshToken(tks.refreshToken)
  tokenPair = tks
}
export const api = new RefreshingTokenApi(
  new HttpApi('http://localhost:3333', 1500, tokens),
  setTokens,
  (error: any) => {
    console.log(error)
    if (error.json.statusCode == 401 || error.json.statusCode == 403) {
      window.location.replace(
        window.location.href.replace('/app', '/auth/signIn'),
      )
    }
    throw error
  },
)
