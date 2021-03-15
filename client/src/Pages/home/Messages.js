import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useMessageState } from '@context/message';

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
  const { selectedUser } = useMessageState();

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [getMessages, selectedUser]);

  if (messagesData) console.log(messagesData.getMessages);

  return (
    <div className="col-span-4">
      {messagesData?.getMessages.length > 0 ? (
        messagesData.getMessages.map((message) => <p key={message.uuid}>{message.content}</p>)
      ) : (
        <p>You are now connected.</p>
      )}
    </div>
  );
}

export default Messages;
