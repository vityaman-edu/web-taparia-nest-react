import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './state/store'
import App from './view/app/App'
import SingIn from './view/app/control/auth/SignIn'
import './view/css/index.scss'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="auth/signIn" element={<SingIn />} />
          <Route path="auth/signUp" element={<SingIn />} />
          <Route path="app" element={<App />} />
        </Routes>
      </BrowserRouter>
      
    </Provider>
  </React.StrictMode>,
)
