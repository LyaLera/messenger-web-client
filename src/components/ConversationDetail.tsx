import { useContext } from "react";
import { ConversationContext } from "../contexts/ConversationContext";
import ConversationInputForm from "./ConversationInputForm";

export default function ConversationDetail() {
  const { currentConversation, messages } = useContext(ConversationContext);
  console.log(currentConversation, messages)
  return (
    <div className="bg-blue-300 p-2 message-container">
      {currentConversation ? (
        <>
        <div>{currentConversation.topic}</div>
        <div>{messages?.sort((a,b) => a.created_at> b. created_at ? 1: -1).map((m) => {
          return (
          <div key={m.id}>
          <p>{m.content}</p>
          <button className="my-2 border border-red-500 bg-red-400" onClick={() => {deleteMessage(m.id)}}>Delete Message</button>
          </div>
          )
        })}</div>
        <ConversationInputForm />
        </>
      ) : (
        <div>Select a conversation to get started</div>
      )}
    </div>
  ); 
}
