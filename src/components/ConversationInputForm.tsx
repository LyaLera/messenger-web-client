import { useContext, useState } from "react";
import { ConversationContext } from "../contexts/ConversationContext";

export default function ConversationInputForm() {
  const { addMessage, currentConversation } = useContext(ConversationContext);
  const [message, setMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    currentConversation &&
    addMessage(message, currentConversation.id, "2");
    setMessage("");
  }
  console.log(message)
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        value={message}
        onChange={handleChange}
      />
      <button className="pl-1" type="submit">Send Message</button>
    </form>
  );
}
