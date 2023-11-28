import { useContext } from "react"
import { ConversationContext } from "../contexts/ConversationContext"

export default function ConversationList() {
    const { conversations, setSelectedConversationId } = useContext(ConversationContext)
    return (
        <div className="h-[calc(100vh-80px)] bg-orange-300 w-[200px] ">
        {conversations.map((conversation) => (
            <div key={conversation.id}  onClick={() => {setSelectedConversationId(conversation.id)}}>{conversation.name}</div>
        ))}
        </div>
    )
}