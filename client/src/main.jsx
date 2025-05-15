import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { persister, store } from './store.jsx'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
<PersistGate loading={<div>Loading...</div>} persistor={persister}>

    <App />
</PersistGate>
    </Provider>
  </StrictMode>,
)
