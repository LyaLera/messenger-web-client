import { useContext, useState } from "react";
import { ConversationContext } from "../contexts/ConversationContext";

export default function ConversationInputForm() {
  const { addMessage } = useContext(ConversationContext);
  const [message, setMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addMessage(message);
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
