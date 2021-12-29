import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import '../App.css';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];

  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? <MyMessage message={message}/>
            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "620px" : "68px",
            }}
          >
             
           {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };
  const handlelogout= (e) =>{
    console.log("tu sam");
    localStorage.clear();
    window.location.reload();
  }

  if (!chat) return "Loading ...";

  return (
    <div className="chat-feed">
      <div className="btn-container">
        <button type="submit" onClick={handlelogout} className="buttonl">
          LOGOUT
        </button>
      </div>
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => {
            if(chat.people.indexOf(person) !== chat.people.length-1){
              return (
                <span>{person.person.username}, </span>
              );
            }else{
              return (
                <span>{person.person.username} </span>
              );
            }
           
          })}
        </div>
      </div>
      {renderMessages()}
      <div style={{ heigh: '100px'}} />
      <div className="message-form-container">
          <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
