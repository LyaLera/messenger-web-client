import { useContext, useState } from "react";
import { ConversationContext } from "../contexts/ConversationContext";

export default function ConversationInputForm() {
  const { addMessage } = useContext(ConversationContext);
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addMessage(message);
      }}
    >
      <input
      value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
