import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useMessageState, useMessageDispatch } from '@context/message';

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

function Messages() {
  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);
  const { users } = useMessageState();
  const dispatch = useMessageDispatch();

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

  let selectedChatMarkup;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a contact.</p>;
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading...</p>;
  } else if (messages.length > 0) {
    selectedChatMarkup = messages.map((message) => <p key={message.uuid}>{message.content}</p>);
  } else if (messages.length === 0) {
    selectedChatMarkup = <p>You are now connected.</p>;
  }

  return <div className="col-span-4">{selectedChatMarkup}</div>;
}

export default Messages;
