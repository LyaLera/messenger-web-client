import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import  ConversationContextProvider  from './contexts/ConversationContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConversationContextProvider>
    <App />
  </ConversationContextProvider>
)
