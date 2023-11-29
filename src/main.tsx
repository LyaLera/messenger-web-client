import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import  ConversationContextProvider  from './contexts/ConversationContext'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ConversationContextProvider>
      <App />
    </ConversationContextProvider>
  </BrowserRouter>
)
