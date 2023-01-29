import { api } from '../../../state/api'

const extractToken = () =>
  /access_token=([^&]+)/.exec(document.location.hash)?.at(1)

export default function YandexRedirect() {
  const token = extractToken()
  if (token != null) {
    api.auth.yandex.signIn(token)
    
  }
  return <></>
}
