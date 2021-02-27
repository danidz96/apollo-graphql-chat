import { useState, useEffect } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import UserChatRow from '@components/UserChatRow';

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

  if (error) {
    console.error(error);
  }

  if (data) {
    console.log(data);
  }

  if (messagesData) console.log(messagesData.getMessages);

  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <UserChatRow key={user.username} user={user} onClick={() => setSelectedUser(user.username)}></UserChatRow>
    ));
  }

  return (
    <div className="w-full h-96 bg-white grid grid-cols-6 rounded-sm shadow-md" style={{ height: '85vh' }}>
      <div className="col-span-2 py-6 bg-gray-50 space-y-3 overflow-y-auto">{usersMarkup}</div>
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
