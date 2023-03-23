import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../state/api'
import { globalState } from '../../../state/globalState'
import { LocalCredentials } from '../../../web/api/dto/local.credentials'
import Button from '../control/button/Button'
import './SignIn.scss'
import YandexSignInButton from './YandexSignInButton'

enum State {
  SignIn,
  SignUp,
}

const SingIn = () => {
  const navigate = useNavigate()
  const [state, setState] = useState(State.SignIn)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const doAuth = async () => {
    if (state == State.SignUp && password != repeatPassword) {
      throw new Error('Passwords do not match')
    }
    const credentials = new LocalCredentials(email, password)
    const method =
      state == State.SignIn ? api.auth.local.signIn : api.auth.local.signUp
    const tokens = await toast.promise(method(credentials), {
      loading: 'Wait a bit...',
      success: <b>Enjoy!</b>,
      error: (e) => (
        <b>
          Oh, chel...{' '}
          {e.json.message.join ? e.json.message.join(' and ') : e.json.message}
          ...
        </b>
      ),
    })
    globalState.setTokens(tokens)
    navigate('/app')
  }

  return (
    <div className="Login">
      <div className="Login-form">
        <h2 className="Login-hello">
          {state == State.SignIn ? 'Is it you again?' : 'Welcome, newbie!'}
        </h2>
        <input
          placeholder="Email"
          type="email"
          className="Login-form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          style={
            state == State.SignUp &&
            (password != repeatPassword ||
              password == '' ||
              password.includes(' '))
              ? { borderColor: '#FF0000' }
              : undefined
          }
          placeholder="Password"
          type="password"
          className="Login-form-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {state == State.SignUp && (
          <input
            style={
              state == State.SignUp &&
              (password != repeatPassword || password == '')
                ? { borderColor: '#FF0000' }
                : undefined
            }
            placeholder="Repeat password"
            type="password"
            className="Login-form-input"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
          />
        )}

        <Button content={'Enter'} onClick={doAuth} />

        <Button
          content={state == State.SignIn ? 'Sign Up' : 'Sign In'}
          onClick={() =>
            setState(state == State.SignIn ? State.SignUp : State.SignIn)
          }
        />

        <YandexSignInButton />
      </div>
    </div>
  )
}

export default SingIn
