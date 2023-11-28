import ConversationDetail from "./components/ConversationDetail"
import ConversationList from "./components/ConversationList"
import Navbar from "./components/Navbar"

function App() {

  return (
    <div className="w-screen h-screen bg-slate-200 max-h-screen flex flex-col">
    <Navbar />
    <div className="flex">
    <ConversationList />
    <ConversationDetail />
    </div>
    
    {/* <ul>
      <li>practise useContext</li>
      <ul>
        <li>create conversationList component</li>
        <li>create conversationDetail component</li>
      </ul>
      <li> practise useRef</li>
      <li>intigrate tailwind</li>
      <li>switch to typescript</li>
      <li>--------------------</li>
      <li>unit testiong / component testing</li>
      <li>add routing</li>
      <li>learn SQL</li>
      <li>create BD schema</li>
      <li>connect to supbase DB</li>
      <li>set up auth context with supabase service</li>
    </ul> */}
    </div>
  )
}

export default App
