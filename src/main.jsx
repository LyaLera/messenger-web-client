import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  ConversationProvider  from './contexts/ConversationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConversationProvider>
    <App />
  </ConversationProvider>
)
