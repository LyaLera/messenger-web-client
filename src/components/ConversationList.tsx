import { useContext, useState } from "react";
import { ConversationContext } from "../contexts/ConversationContext";

export default function ConversationList() {
  const { conversations, setSelectedConversationId, selectedConversationId } =
    useContext(ConversationContext);
  const [search, setSearch] = useState("")

  const filteredConversation = conversations.filter((conversation) =>
  conversation.name.toLowerCase().includes(search))

  const conversationsToDisplay = search ? filteredConversation : conversations

  return (
    <div className=" bg-orange-300">
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
              history.pushState(null, "", "/conversations/" + conversation.id);
              setSelectedConversationId(conversation.id);
            }}
            className={
              conversation.id === selectedConversationId
                ? "bg-orange-500 p-2"
                : "bg-orange-300 p-2"
            }
          >
            {conversation.name}
          </div>
      ))}
    </div>
    </div>
  );
}
