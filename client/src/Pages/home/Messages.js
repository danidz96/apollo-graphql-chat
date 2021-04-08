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
    if (!message.trim() || !selectedUser) return;

    sendMessage({ variables: { to: selectedUser.username, content: message } });
    setMessage('');
  };

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p className="self-center text-gray-500">Select a contact.</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => <Message key={message.id} message={message} />);
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are now connected.</p>;
  }

  return (
    <div className="col-span-5 md:col-span-4 flex flex-col-reverse p-3 pr-0 overflow-y-auto">
      <div className="overflow-y-auto flex flex-col-reverse pr-3">{selectedChatMarkup}</div>
      <form onSubmit={onSubmitMessage} className="order-first mt-2 pr-3 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full py-2 px-4 rounded-3xl bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
        />
        <i role="button" className="fas fa-paper-plane fa-lg ml-3 mr-1 text-blue-500" onClick={onSubmitMessage}></i>
      </form>
    </div>
  );
}

export default Messages;
