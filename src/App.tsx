import ConversationDetail from "./components/ConversationDetail"
import ConversationList from "./components/ConversationList"
import Navbar from "./components/Navbar"

function App() {

  return (
      <div className="w-screen h-screen bg-slate-200 max-h-screen flex flex-col">
      <Navbar/>
      <div className="flex">
        <ConversationList />
        <ConversationDetail />
      </div>
    </div>
  )
}

export default App
