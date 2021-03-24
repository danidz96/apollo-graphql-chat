import { useEffect, useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useMessageState, useMessageDispatch } from '@context/message';
import Message from '@components/Message';

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

function Messages() {
  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) =>
      dispatch({ type: 'ADD_MESSAGE', payload: { username: selectedUser.username, message: data.sendMessage } }),
    onError: (err) => console.log(err),
  });

  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

  const [message, setMessage] = useState('');

  const selectedUser = users?.find((user) => user.selected === true);
  const messages = selectedUser?.messages;

  useEffect(() => {
    if (selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [getMessages, selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: 'SET_USER_MESSAGES',
        payload: { username: selectedUser?.username, messages: messagesData.getMessages },
      });
    }
  }, [messagesData]);

  const onSubmitMessage = (event) => {
    event.preventDefault();
    if (!message) return;

    sendMessage({ variables: { to: selectedUser.username, content: message } });
    setMessage('');
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a contact.</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => <Message key={message.id} message={message} />);
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are now connected.</p>;
  }

  return (
    <div className="col-span-5 md:col-span-4 flex flex-col-reverse p-3 overflow-y-auto">
      {selectedChatMarkup}
      <form onSubmit={onSubmitMessage} className="order-first">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
        />
      </form>
    </div>
  );
}

export default Messages;
