import { ChatEngine } from 'react-chat-engine';
import ChatFeed from "./Components/ChatFeed";
import LoginForm from "./Components/LoginForm";
import './App.css';

const App =  () => {
    if(!localStorage.getItem('username')) return <LoginForm />
    return (
        <ChatEngine 
            height="100vh"
            projectID="5ce5dd50-008d-42e6-94eb-1c39ca8c166e"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {... chatAppProps}/>}
        />
    );

}

export default App;