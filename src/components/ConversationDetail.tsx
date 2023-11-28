import { useContext } from "react";
import { ConversationContext } from "../contexts/ConversationContext";
import ConversationInputForm from "./ConversationInputForm";

export default function ConversationDetail() {
  const { currentConversation, deleteMessage } = useContext(ConversationContext);
  return (
    <div className="h-[calc(100vh-80px)] bg-blue-300 w-full">
      {currentConversation ? (
        <>
        <div>{currentConversation.name}</div>
        {currentConversation.messages?.sort((a,b) => a.createdAt > b. createdAt ? 1: -1).map((m) => {
          return (
          <div key={m.id}>
          <p>{m.body}</p>
          <button className="my-2 border border-red-500 bg-red-400" onClick={() => {deleteMessage(m.id)}}>Delete Message</button>
          </div>
          )
        })}
        <ConversationInputForm />
        </>
      ) : (
        <div>Select a cnversation to get started</div>
      )}
    </div>
  ); 
}
