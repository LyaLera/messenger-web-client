// import { v4 as uuidv4 } from 'uuid';
import { createContext, useState, useEffect, ReactNode } from "react";


export interface MessageI {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  conversation_id: string;
}

export interface ConversationI {
  created_at: string;
  id: string;
  topic: string;
  updated_at: string;
}

export interface UserI {
  name: string;
  age: number;
  id: string;
  location: string;
}

export interface ConversationContextI {
  conversations: Array<ConversationI>;
  setConversations: (conversation: ConversationI[]) => void;
  selectedConversationId: string | undefined;
  setSelectedConversationId: (id: string) => void;
  currentConversation: ConversationI | null;
  messages: Array<MessageI>;
  setMessages:(message: MessageI[]) => void;
  addMessage: (content: string, conversationsId: string) => void;
  deleteMessage: (id: string) => void;
  updateMessage: (message: MessageI) => void;
  users: Array<UserI>
  setUsers: (user: UserI[]) => void;
  userId: string
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
  deleteMessage: () => {},
  updateMessage: () => {},
  userId: "",
  users: [] as Array<UserI>,
  setUsers: () => {},
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
  const [users, setUsers] = useState<Array<UserI>>([])
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | undefined
  >("");
  const [currentConversation, setCurrentConversation] =
    useState<ConversationI | null>(null);
  const userId = '863b1b4f-c440-41b0-9272-af610c9ce380'
    
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

  const fetchUsers = async () => {
    try {
      let response = await fetch(
        'http://localhost:3304/users');
      let data = await response.json();
      let usersFromServer = data;
      console.log(data)
      setUsers(usersFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchMessages = async (conversation_id: string | undefined) => {
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

  // useEffect(() => {
  //   fetchMessages(selectedConversationId);
  // }, [messages]);

  const postMessage = async (newMessage : {content: string, user_id: string, conversation_id: string}) => {
    console.log(JSON.stringify(newMessage))
    try {
      let response = await fetch(
        'http://localhost:3304/messages',
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMessage),
        }
      );
      console.log(newMessage)
      if (response.status === 201) {
        console.log("Message was successfully added to db");
        const createdMessage = await response.json()
        console.log("Response from server: ", createdMessage)
        return createdMessage
      } else {
        let error = new Error("Could not add message to db");
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function addMessage(content: string, conversationId: string) {
    if(selectedConversationId) {
    let newMessage = {
      content: content,
      user_id: userId,
      conversation_id: conversationId,
    }
    //pessimistic - server will create id and date 
    //optimistic - when we update React data before the server will say all is correct
    const createdMessage = await postMessage(newMessage)
    console.log("AHHHHHHH", createdMessage)
    if(createdMessage) {
      setMessages([...messages, createdMessage])
    } else {
      console.error("Error: createdMessage is undefined")
    }
    
  }}

  const deleteMessageInServer = async (deleteId: string) => {
    try {
      let response = await fetch(
        'http://localhost:3304/messages/' + deleteId,
        {
          method: "DELETE",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function deleteMessage(deletedId: string) {
    if(selectedConversationId){
      let filteredMessages = messages.filter((message) => 
      message.id !== deletedId)
      setMessages(filteredMessages)
      deleteMessageInServer(deletedId)
    }
  }

  const editMessageInServer = async (changedMessage: MessageI ) => {
    try {
      let response = await fetch('http://localhost:3304/messages/' + changedMessage.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedMessage),
      }
      )
      if (response.status === 201) {
        console.log("Message was successfully edited in a server");
      } else {
        let error = new Error("Could not edit message in a server");
        throw error;
      }
    } catch(error) {
      console.log(error);
    }
  }

  function updateMessage(changedMessage: MessageI) {
    setMessages(messages.map((message) => {
      if(message.id === changedMessage.id) {
        return changedMessage
      } else {
        return message
      }
    }))
    editMessageInServer(changedMessage)
  }

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
        addMessage,
        deleteMessage,
        updateMessage,
        userId,
        users,
        setUsers
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
