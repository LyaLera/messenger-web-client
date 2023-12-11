import { useContext, useState } from "react";
import { ConversationContext, MessageI } from "../contexts/ConversationContext";
import ConversationInputForm from "./ConversationInputForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPen,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ConversationDetail() {
  const { currentConversation, messages } = useContext(ConversationContext);

  console.log(currentConversation, messages);

  return (
    <div className="bg-blue-300 p-2 message-container">
      {currentConversation ? (
        <>
          <div>{currentConversation.topic}</div>
          <div>
            {messages.map((message) => {
              return (
                <div key={message?.id}>
                  <Message
                    message={message}
                  />
                </div>
              );
            })}
          </div>
          <ConversationInputForm />
        </>
      ) : (
        <div>Select a conversation to get started</div>
      )}
    </div>
  );
}


function Message({ message }: {message: MessageI}) {
  const { updateMessage, deleteMessage, userId } = useContext(ConversationContext);
  const [isEditing, setIsEditing] = useState(false);

  let messagesContent;
  if (isEditing) {
    messagesContent = (
      <div key={message.id}>
        <input
          value={message.content}
          onChange={(e) => {
            updateMessage({
              ...message,
              content: e.target.value,
            });
          }}
        />
        <button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          <FontAwesomeIcon icon={faSquareCheck} />
        </button>
      </div>
    );
  } else if(message){
    messagesContent = (
      <div key={message.id}>
        {message.content}
        <button onClick={() => {
          if(message.user_id === userId) {
            setIsEditing(true)};
        }}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    );
  }
  return (
    <div key={message.id}>
      <p className="message-content m-2">{messagesContent}</p>
      <button
        className="my-2"
        onClick={() => {
          if(message.user_id === userId) {
          deleteMessage(message.id);}
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
}
