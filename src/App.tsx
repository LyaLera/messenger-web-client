import Conversation from "./Conversation"
import Navbar from "./components/Navbar"
import Login from "./Login"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />}/>
        {/* <div className="w-screen h-screen bg-slate-200 max-h-screen flex flex-col"> */}
        <Route path="/conversations/:id?" element={[<Navbar/>, <Conversation />]}/>
        {/* <Route path="/conversations/:id?" element={<ConversationDetail/>}/> */}
        {/* <div className="flex"> */}
        {/* </div>
      </div> */}
    </Routes>
  )
}

export default App
