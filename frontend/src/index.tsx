import React from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { store } from './state/store'
import App from './view/app/App'
import SingIn from './view/app/auth/SignIn'
import { ErrorBoundary } from './view/app/control/ErrorBoundary'
import './view/css/index.scss'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<SingIn />} />
          <Route path="auth/login" element={<SingIn />} />
          <Route path="auth/signIn" element={<SingIn />} />
          <Route path="auth/signUp" element={<SingIn />} />
          <Route
            path="app"
            element={
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
