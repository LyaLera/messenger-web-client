import ConversationDetail from "./ConversationDetail";
import ConversationList from "./ConversationList";

export default function Conversation() {
    return (
        <div className="conversation-container">
        <ConversationList />
        <ConversationDetail />
        </div>
    )
}