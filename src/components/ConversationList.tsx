import { useContext } from "react"
import { ConversationContext } from "../contexts/ConversationContext"

export default function ConversationList() {
    const { conversations, setSelectedConversationId, selectedConversationId } = useContext(ConversationContext)
    return (
        <div className=" bg-orange-300">
        {conversations.map((conversation) => (
            <div 
                key={conversation.id}  
                onClick={() => {
                    history.pushState(null, "", "/conversations/" + conversation.id)
                    setSelectedConversationId(conversation.id)}}
                className={conversation.id === selectedConversationId ? "bg-orange-500 p-2" : "bg-orange-300 p-2" }>
                {conversation.name}
            </div>    
        ))}
        </div>
    )
}