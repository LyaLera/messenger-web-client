import { useContext } from "react";
import { ConversationContext } from "../contexts/ConversationContext";

export default function ConversationDetail() {
  const { currentConversation } = useContext(ConversationContext);
  return (
    <div className="h-[calc(100vh-80px)] bg-blue-300 w-full">
      {currentConversation ? (
        <div>{currentConversation.name}</div>
      ) : (
        <div>Select a cnversation to get started</div>
      )}
    </div>
  ); 
}
