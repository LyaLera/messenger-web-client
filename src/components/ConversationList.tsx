import { useContext, useState } from "react";
import { ConversationContext } from "../contexts/ConversationContext";

export default function ConversationList() {
  const { conversations, setSelectedConversationId, selectedConversationId } =
    useContext(ConversationContext);
  const [search, setSearch] = useState("")

  const filteredConversation = conversations.filter((conversation) =>
  conversation.topic.toLowerCase().includes(search))

  const conversationsToDisplay = search ? filteredConversation : conversations

  return (
    <div className="conv-list-container">
        <input type="text" 
        className="m-4 p-1"  
        placeholder="Search for conversation"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}/>
        <div>
        {!filteredConversation.length && (
        <div>There are no such conversations</div>
      )}
        {conversationsToDisplay.map((conversation) => ( 
          <div
            key={conversation.id}
            onClick={() => {
              setSelectedConversationId(conversation.id);
            }}
            className={
              conversation.id === selectedConversationId
                ? "bg-neutral-500 p-2 "
                 : "p-2"
            }
          >
            {conversation.topic}
          </div>
      ))}
    </div>
    </div>
  );
}
