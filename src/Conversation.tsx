import ConversationDetail from "./components/ConversationDetail";
import ConversationList from "./components/ConversationList";

export default function Conversation() {
    return (
        <div className="conversation-container">
        <ConversationList />
        <ConversationDetail />
        </div>
    )
}