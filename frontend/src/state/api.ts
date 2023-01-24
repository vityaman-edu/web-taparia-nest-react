import { TokenPair } from '../web/api/dto/token.pair'
import { HttpApi } from '../web/api/httpApi'
import { RefreshingTokenApi } from '../web/api/refreshingTokenApi'

let tokenPair: TokenPair = new TokenPair(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidml0eWFAdml0eWEucnUiLCJpYXQiOjE2NzQ1NDEyNDksImV4cCI6MTY3NDU0MjE0OX0.uOaCX2JgrnRG6fStO5a0lwWOWnhvg2jrCPf_TfekLus',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidml0eWFAdml0eWEucnUiLCJpYXQiOjE2NzQ1NDEyNDksImV4cCI6MTY3NTE0NjA0OX0.Br1jC23U0Y9SK4YYXOm3LYvtAD-A03bMfg3M7QNqGVg',
)
const tokens = () => tokenPair
export const api = new RefreshingTokenApi(
  new HttpApi('http://localhost:3333', 1500, tokens),
  (tokens) => {
    tokenPair = tokens
  },
)
