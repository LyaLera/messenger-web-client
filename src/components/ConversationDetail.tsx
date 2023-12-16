



import { useContext, useState } from "react";
import { ConversationContext, MessageI } from "../contexts/ConversationContext";
import ConversationInputForm from "./ConversationInputForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPen,
  faSquareCheck,
  faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

export default function ConversationDetail() {
  const { currentConversation, messages, participationEvents, users, addParticipationEvent, userId } = useContext(ConversationContext);
  // const [participant, setParticipant] = useState()

  // useEffect(()=> {
  //   const messagesPopulatedWithNames = messages.map(m => m.user = users.find(u => u.id === m.user_id))
  //   const messagesGroupedByAuthor = []
  //   messagesPopulatedWithNames.forEach((m,i)=> {
  //     if(messagesGroupedByAuthor.length === 0) {
  //       messagesGroupedByAuthor.push([m])
  //     } else {
  //       if(m.user_id === messagesGroupedByAuthor[messagesGroupedByAuthor.length-1].user_id) {
  //         messagesGroupedByAuthor[messagesGroupedByAuthor.length-1].push(m)
  //       } else {
  //         messagesGroupedByAuthor.push([m])
  //       }
  //     }
  //   })
  // }, [messages])

  let lastPartEventsUniqUserId = {} 
  for( let i = 0; i < participationEvents.length; i++) {
    let currentEvent = participationEvents[i]
    let userIdInEvent = currentEvent.user_id
      lastPartEventsUniqUserId[userIdInEvent] = currentEvent
  }

  let filteredEventsArray = Object.values(lastPartEventsUniqUserId)
  console.log(filteredEventsArray)

  return (
    <div className="bg-blue-300 p-2 message-container">
      {currentConversation ? (
        <>
          <div>
            <p className="inline mr-4">{currentConversation.topic}</p>
            <button onClick={() => {
                  addParticipationEvent(userId, currentConversation.id)
                }}><FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
          </div>
          { 
          filteredEventsArray.map((partEvent) =>
                partEvent.participant === true ? users.map((user) => {
                  if(partEvent.user_id === user.id) {
                    return (
                    <b>{user.name}</b>
                    )
                  }})
                  :  users.map((user) => {
                    if(partEvent.user_id === user.id) {
                      return (
                      <b>{user.name} left this conversation</b>
                      )
                    }}
            ))}
          <div>
            {messages.map((message, index) => {
              return (
                <div key={message.id}>
                  <Message
                    message={message}
                    isFirstInGroup={messages[index-1]?.user_id !== messages[index]?.user_id}
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


function Message({ message, isFirstInGroup }: {message: MessageI, isFirstInGroup: boolean}) {
  const { updateMessage, deleteMessage, userId, users } = useContext(ConversationContext);
  const [isEditing, setIsEditing] = useState(false);

  function unescape(string: string) {
    const a = new DOMParser()
    const b = a.parseFromString(string,'text/html')
    const c = b.querySelector('html')
    const d = c?.textContent
    return d
  }

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
        {unescape(message.content)}
        <button onClick={() => {
          if(message.user_id === userId) {
            setIsEditing(true)};
        }}>
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>
    );
  }

  let userName = users.map((user) => {
    return (
      message.user_id === user.id && 
      <p>{user.name}</p>
    ) 
  }) 

  return (
        <div key={message.id}>
          <div>
            <p>{isFirstInGroup?userName:""}{messagesContent}</p>
          </div>
        
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
    )
}
