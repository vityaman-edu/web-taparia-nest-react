import { ApiError } from '../web/api/dto/apiError'
import { HttpApi } from '../web/api/httpApi'
import { RefreshingTokenApi } from '../web/api/refreshingTokenApi'
import { globalState } from './globalState'

export const api = new RefreshingTokenApi(
  new HttpApi('http://localhost:3333', 1500, () => globalState.getTokens()),
  (tokens) => globalState.setTokens(tokens),
  (error: ApiError) => {
    if (error.json.statusCode == 401 || error.json.statusCode == 403) {
      window.location.replace(
        window.location.href.replace('/app', '/auth/signIn'),
      )
    }
    throw error
  },
)
