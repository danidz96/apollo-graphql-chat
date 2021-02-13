import { gql, useQuery } from '@apollo/client';
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

function Home() {
  const { loading, data, error } = useQuery(GET_USERS);

  if (error) {
    console.error(error);
  }
  if (data) {
    console.log(data);
  }

  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => <UserChatRow key={user.username} user={user}></UserChatRow>);
  }

  return (
    <div className="w-full h-96 bg-white grid grid-cols-6 rounded-sm shadow-md" style={{ height: '85vh' }}>
      <div className="col-span-2 py-6 bg-gray-50 space-y-3">{usersMarkup}</div>
      <div className="col-span-4">Messages</div>
    </div>
  );
}

export default Home;
