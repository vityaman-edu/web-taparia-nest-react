import { HttpApi } from "../web/api/httpApi"
import { RefreshingTokenApi } from "../web/api/refreshingTokenApi"
import { useAppDispatch } from "./hooks"
import { userAction } from "./slice/userSlice"
import { store } from "./store"

const tokens = () => store.getState().user.tokens
const dispatch = () => useAppDispatch()
export const api = new RefreshingTokenApi(
  new HttpApi('http://localhost:3333', 1500, tokens),
  (tokens) => dispatch()(userAction.setTokens(tokens)),
)

