import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import ChatBottom from '../../components/chat-window/bottom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useRoom } from '../../context/rooms.context';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/current-room.context';
import { transformToArr } from '../../misc/Helper';
import { auth } from '../../misc/firebase';

const Chat = () => {
  const { chatId } = useParams();

  const rooms = useRoom();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>;
  }

  const { name, description } = currentRoom;

  const admins = transformToArr(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);

  const currentRoomData = {
    name,
    description,
    admins,
    isAdmin,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>

      <div className="chat-middle">
        <Messages />
      </div>

      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
