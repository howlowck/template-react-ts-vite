import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'
import App from './components/layouts/App'

const store = setupStore()

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

