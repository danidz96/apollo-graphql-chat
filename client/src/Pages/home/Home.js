import { useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { useMessageDispatch } from '@context/message';
import { useAuthState } from '@context/auth';
import Users from './Users';
import Messages from './Messages';

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

function Home() {
  const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE);
  const messageDispatch = useMessageDispatch();
  const { user } = useAuthState();

  useEffect(() => {
    if (messageError) console.log(messageError);
    if (messageData) {
      const message = messageData.newMessage;
      const otherUser = user.username === message.to ? message.from : message.to;

      messageDispatch({ type: 'ADD_MESSAGE', payload: { username: otherUser, message } });
    }
  }, [messageError, messageData]);
  return (
    <div className="w-full h-96 bg-white grid grid-cols-6 rounded-sm shadow-md" style={{ height: '85vh' }}>
      <Users />
      <Messages />
    </div>
  );
}

export default Home;
