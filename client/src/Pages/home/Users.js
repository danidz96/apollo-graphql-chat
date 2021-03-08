import { gql, useQuery } from '@apollo/client';
import UserChatRow from '@components/UserChatRow';
import { useMessageDispatch, useMessageState } from '@context/message';

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

function Users({ setSelectedUser }) {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => dispatch({ type: 'SET_USERS', payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let usersMarkup;
  if (!users || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (users.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    usersMarkup = users.map((user) => (
      <UserChatRow key={user.username} user={user} onClick={() => setSelectedUser(user.username)}></UserChatRow>
    ));
  }

  return <div className="col-span-2 py-6 bg-gray-50 space-y-3 overflow-y-auto">{usersMarkup}</div>;
}

export default Users;
