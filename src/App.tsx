import Conversation from "./components/Conversation"
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/conversations/:id" element={[<Navbar/>, <Conversation />]}/>
    </Routes>
  )
}

export default App
