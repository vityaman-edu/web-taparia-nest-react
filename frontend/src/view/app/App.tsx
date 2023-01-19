import Control from './control/Control'
import Canvas  from './canvas/Canvas'
import Table   from './table/Table'
import './App.scss'

const App = () => {
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
          </ul>
        </nav>
      </header>
      <div className="App-main">
        <div className="App-title">
          <h1>Welcome to Taparia</h1>
        </div>
        <div className="App-columns">
          <Control/>
          <Canvas/>
          <Table/>
        </div>
      </div>
      <footer className="App-footer">
      
      </footer>
    </div>
  )
}

export default App
