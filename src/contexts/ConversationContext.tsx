import { createContext, useState, useEffect, ReactNode } from "react"

interface MessageI {
    id: string,
    body: string,
    createdAt: Date,
    authorId: string,
    conversationId: string
}

interface ConversationI {
    id: string,
    name: string,
    messages: [MessageI]
}

interface ConversationContextI {
    conversations: Array<ConversationI>;
    setConversations: (conversation: ConversationI[]) => void
    selectedConversationId: string | null;
    setSelectedConversationId: (id: string)=> void;
    currentConversation: ConversationI | null;
}

const defaultContextData: ConversationContextI = {
    currentConversation: {} as ConversationI,
    conversations: [] as Array<ConversationI>,
    setConversations: () => {},
    selectedConversationId: "",
    setSelectedConversationId: () => {},
}
export const ConversationContext = createContext<ConversationContextI>(defaultContextData)

export default function ConversationContextProvider({children}: {children: ReactNode}) {
    const [conversations, setConversations] = useState<Array<ConversationI>>([
           { id: "1",
            name: "conversation 1",
            messages: [
              {
                id: "000",
                body: "hey this is a message from chris in conversation 1",
                createdAt: new Date(),
                authorId: "5",
                conversationId: "1",
              },
            ],
          },
          {
            id: "2",
            name: "conversation 2",
            messages: [
              {
                id: "001",
                body: "hey this is a message from chris in conversation 2",
                createdAt: new Date(),
                authorId: "5",
                conversationId: "2",
              },
            ],
        }
    ])
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
    const [currentConversation, setCurrentConversation] = useState<ConversationI | null>(null)

    // computed value
    useEffect(() => {
        const foundConversation: ConversationI | undefined = conversations.find((conversation) => 
        conversation.id === selectedConversationId)
    if(foundConversation?.id) {
        setCurrentConversation(foundConversation)}
    }, [conversations, selectedConversationId])
    return (
        <ConversationContext.Provider value={{conversations, setConversations, 
        selectedConversationId, setSelectedConversationId, 
        currentConversation}}>
            {children}
        </ConversationContext.Provider>
    )
}

// TypeSrcipt
// interface User  {
//     name: string,
//     age: number,
//     hobbies: Array<string>
// }
// const user : User= {
//     name: "Alice",
//     age: 12,
//     hobbies: ["football, programming"]
// };
// console.log(user)