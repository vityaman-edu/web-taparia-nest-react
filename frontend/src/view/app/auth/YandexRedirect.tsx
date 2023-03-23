import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../state/api'
import { globalState } from '../../../state/globalState'

const extractToken = () =>
  /access_token=([^&]+)/.exec(document.location.hash)?.at(1)

export default function YandexRedirect() {
  const [accessToken, setAccessToken] = useState(extractToken())
  const navigate = useNavigate()

  const doAuth = async (accessToken: string) => {
    const tokens = await toast.promise(api.auth.yandex.signIn(accessToken), {
      loading: 'Waiting for authentication...',
      // TODO: bug - duplicate toast
      success: <b>Yandex ID Auth done!</b>,
      error: (e) => (
        <b>
          Error:
          {(e && e.json.message.join) ? e.json.message.join(' and ') : e.json.message}
        </b>
      ),
    })
    globalState.setTokens(tokens)
    navigate('/app')
  }

  accessToken && doAuth(accessToken)

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <p>Yandex ID Authentication...</p>
    </div>
  )
}
