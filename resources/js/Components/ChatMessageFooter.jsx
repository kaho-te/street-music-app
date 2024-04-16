export default function ChatMessageHeader(props) {

  const chatMessage = props.chatMessage;
  const dt = new Date(chatMessage.created_at);

  return (
      <>
          <small className="text-gray-400">{chatMessage.created_at}</small>
      </>

  );

};