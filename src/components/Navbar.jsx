import { useContext } from "react"
import { ConversationContext } from "../contexts/ConversationContext"

export default function Navbar() {
    const { conversations } = useContext(ConversationContext)
    return <div className="w-full h-[80px] bg-cyan-300">
        You have {conversations.length} conversations
        </div>
}