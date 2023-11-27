import {  createContext, useState } from "react"

export const ConversationContext = createContext(null)

export default function ConversationProvider({children}) {
    const [conversations, setConversations] = useState([
        {id: 1, name: "conversation 1"},
        {id: 2, name: "conversation 2"}
    ])
    const [selectedConversationId, setSelectedConversationId] = useState(null)


    return (
        <ConversationContext.Provider value={{conversations, setConversations, selectedConversationId, setSelectedConversationId}}>
            {children}
        </ConversationContext.Provider>
    )
}