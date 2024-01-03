import { useContext, useState } from "react";
import { ConversationContext, MessageI, ParticipationEventsI } from "../contexts/ConversationContext";
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

  let lastPartEventsUniqUserId: Record<string, ParticipationEventsI> = {} 
  for( let i = 0; i < participationEvents.length; i++) {
    let currentEvent = participationEvents[i]
    let userIdInEvent = currentEvent.user_id
      lastPartEventsUniqUserId[userIdInEvent] = currentEvent
  }

  let filteredEventsArray = Object.values(lastPartEventsUniqUserId)

const messagesArray = [...messages];
const eventsArray = [...filteredEventsArray];

// Sort messages and events based on the created_at property
const allEvents = [...messagesArray, ...eventsArray]
allEvents.sort((a, b) => {
  return Number(a.created_at) - Number(b.created_at);
});


  return (
    <div className="p-2 message-container">
      {currentConversation ? (
        <>
          <div>
            <p className="inline mr-4">{currentConversation.topic}</p>
            <button onClick={() => {
                  addParticipationEvent(userId, currentConversation.id)
                }}><FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
          </div>
            {filteredEventsArray.map((partEvent) => 
                partEvent.participant === true && users.map((user) => {
                  if(partEvent.user_id === user.id) {
                    return (
                    <ul>
                      <li><b>{user.name}</b></li>
                    </ul>
                    )
                  }})
            )}    
          <div>
            {allEvents.map((event, index) => (
              <div key={event.id}>
                <Message event={event as MessageI} isFirstInGroup={index === 0 || allEvents[index - 1].user_id !== event.user_id} />
              </div>
            ))}
          </div>
          <ConversationInputForm />
        </>
      ) : (
        <div>Select a conversation to get started</div>
      )}
    </div>
  );
}

function Message({ event, isFirstInGroup }: {event: MessageI, isFirstInGroup: boolean}) {
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

  if ('content' in event) {
    // It's a message
    const message = event as MessageI;

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
        <button 
        onClick={() => {
          if(message.user_id === userId) {
            setIsEditing(true)};
        }}>
          <FontAwesomeIcon icon={faPen} />
        </button>
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

  let userName = users.map((user) => {
    return (
      message.user_id === user.id && 
      <p>{user.name}</p>
    ) 
  }) 

  return (
        <div key={message.id}>
          <div>
            <p>{isFirstInGroup?<b>{userName}</b>:""}{messagesContent}</p>
          </div>
      </div>
    )
} else {
  // It's a participation event
  const eventParticipation = event as ParticipationEventsI;
  const user = users.find((u) => u.id === eventParticipation.user_id);

  if (eventParticipation.participant === false) {
    return (
      <div key={eventParticipation.id}>
        <p><b>{user?.name} left the conversation</b></p>
      </div>
    );
  } 
}
}
