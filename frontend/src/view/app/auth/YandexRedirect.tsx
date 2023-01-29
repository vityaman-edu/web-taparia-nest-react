import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../state/api'
import { globalState } from '../../../state/globalState'

const extractToken = () =>
  /access_token=([^&]+)/.exec(document.location.hash)?.at(1)

export default function YandexRedirect() {
  const navigate = useNavigate()
  const token = extractToken()

  useEffect(() => {
    if (token != null) {
      toast.promise(
        api.auth.yandex
          .signIn(token)
          .then((tokens) => globalState.setTokens(tokens))
          .then(() => navigate('/app')),
        {
          loading: 'Authentication in progress...',
          success: <b>Ready!</b>,
          error: (e) => (
            <b>
              Error:
              {e.json.message.join
                ? e.json.message.join(' and ')
                : e.json.message}
            </b>
          ),
        },
      )
    }
  })
  return <></>
}
