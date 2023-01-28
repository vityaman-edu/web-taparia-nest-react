import Control from './control/Control'
import Canvas from './canvas/Canvas'
import './App.scss'
import RightPanel from './right/RightPanel'
import { api } from '../../state/api'
import { useAppSelector } from '../../state/hooks'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const explorerStatus = useAppSelector((state) => state.pictureExplorer.status)
  const explorerError = useAppSelector((state) => state.pictureExplorer.error)
  const tableError = useAppSelector((state) => state.table.error)
  const tableStatus = useAppSelector((state) => state.table.status)

  const navigate = useNavigate()

  useEffect(() => {
    if (explorerStatus == 'failed') {
      toast.error(explorerError)
    }
    if (tableStatus == 'failed') {
      toast.error(tableError)
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <nav className="nav">
          <ul className="nav">
            <li className="nav-inline">
              <a href="https://itmo.ru/">ITMO University</a>
            </li>
            <li className="nav-inline">
              <a href="#Story">Story</a>
            </li>
            <li className="nav-inline">
              <a href="https://github.com/vityaman">Contact</a>
            </li>
            <li className="nav-inline">
              <a href=""onClick={async (e) => {
                e.preventDefault()
                await api.auth.logout()
                // TODO: remove token from local storage
                toast.success('Logged out!')
                navigate('/auth/logIn')
              }}>Logout</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="App-main">
        <div className="App-title">
          <h1>Welcome to Taparia</h1>
        </div>
        <div className="App-columns">
          <Control />
          <Canvas />
          <RightPanel />
        </div>
      </div>
      <footer className="App-footer"></footer>
    </div>
  )
}

export default App
