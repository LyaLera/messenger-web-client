import { nanoid } from "nanoid";
import { createContext, useState, useEffect, ReactNode } from "react";


interface MessageI {
  id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  conversation_id: string;
}

interface ConversationI {
  created_at: Date;
  id: string;
  topic: string;
  updated_at: Date;
}

interface ConversationContextI {
  conversations: Array<ConversationI>;
  setConversations: (conversation: ConversationI[]) => void;
  selectedConversationId: string | undefined;
  setSelectedConversationId: (id: string) => void;
  currentConversation: ConversationI | null;
  messages: Array<MessageI>;
  setMessages:(message: MessageI[]) => void;
  addMessage: (content: string, conversationsId: string, userId: string) => void;
  // deleteMessage: (id: string) => void;
}

const defaultContextData: ConversationContextI = {
  currentConversation: {} as ConversationI,
  conversations: [] as Array<ConversationI>,
  setConversations: () => {},
  messages: [] as Array<MessageI>,
  setMessages: () => {},
  selectedConversationId: "",
  setSelectedConversationId: () => {},
  addMessage: () => {},
  // deleteMessage: () => {},
};
export const ConversationContext =
  createContext<ConversationContextI>(defaultContextData);

export default function ConversationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [conversations, setConversations] = useState<Array<ConversationI>>([]);
  const [messages, setMessages] = useState<Array<MessageI>>([])
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | undefined
  >("");
  const [currentConversation, setCurrentConversation] =
    useState<ConversationI | null>(null);
    
    // when the page loads, we want to read the URL and get conversationId, if there is one
    useEffect(()=>{
      if(!selectedConversationId) {
        const fullUrl = window.location.href;
       const id = fullUrl.split("/").pop();
       setSelectedConversationId(id);
     }
    },[])

    useEffect(() => {
      // when the user changes the selectedConversationId, we want update id in the URL
      history.pushState(null, "", "/conversations/" + selectedConversationId);
      if(selectedConversationId !== undefined) {
        // when the user changes the selectedConversationId, we want request messages for that conversation
        fetchMessages(selectedConversationId)

        // when the user changes the selectedConversationId, we want set "currentConversation"
        const foundConversation: ConversationI | undefined = conversations.find(
          (conversation) => conversation.id == selectedConversationId
        );

        if (foundConversation?.id) {
          setCurrentConversation(foundConversation);
        }

      } else {
        setMessages([])
        setCurrentConversation(null)
      } 
      // without "waiting" for conversations http response to arrive, we have created a "race condition"
      // where we try to select the "currentConversation" before we have received *any* conversations
    }, [conversations, selectedConversationId])


  const fetchConversations = async () => {
    try {
      let response = await fetch(
        'http://localhost:3304/conversations'
      );
      let data = await response.json();
      let conversationsFromServer = data;
      setConversations(conversationsFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchMessages = async (conversation_id: string) => {
    try {
      let response = await fetch(
        'http://localhost:3304/messages/conversation/' + conversation_id
      );
      let data = await response.json();
      let messagesFromServer = data;
      console.log(data)
      setMessages(messagesFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  function addMessage(content: string, conversationId: string, userId: string) {
    if(selectedConversationId) {
    let newMessege = {
      id: nanoid(),
      content: content,
      created_at: new Date,
      updated_at: new Date,
      user_id: userId,
      conversation_id: conversationId,
    }
    setMessages([...messages, newMessege])
  }}

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        selectedConversationId,
        setSelectedConversationId,
        currentConversation,
        messages,
        setMessages,
        addMessage
        // deleteMessage
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
