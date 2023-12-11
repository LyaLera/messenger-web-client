import { useContext, useState } from "react";
import { ConversationContext } from "../contexts/ConversationContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

export default function ConversationInputForm() {
  const { addMessage, currentConversation } = useContext(ConversationContext);
  const [messageContent, setMessageContent] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageContent(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    currentConversation &&
    addMessage(messageContent, currentConversation.id);
    setMessageContent("");
  }
  console.log(messageContent)
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        value={messageContent}
        onChange={handleChange}
      />
      <button className="pl-1" type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
    </form>
  );
}
