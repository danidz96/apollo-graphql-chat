import { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import UserChatRow from '@components/UserChatRow';
import Users from './Users';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      createdAt
      imageUrl
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

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

function Home() {
  const { loading, data, error } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState(null);

  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [getMessages, selectedUser]);

  if (messagesData) console.log(messagesData.getMessages);

  return (
    <div className="w-full h-96 bg-white grid grid-cols-6 rounded-sm shadow-md" style={{ height: '85vh' }}>
      <Users setSelectedUser={setSelectedUser} />
      <div className="col-span-4">
        {messagesData?.getMessages.length > 0 ? (
          messagesData.getMessages.map((message) => <p key={message.uuid}>{message.content}</p>)
        ) : (
          <p>You are now connected.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
