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

function Users() {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const selectedUser = users?.find((user) => user.selected === true)?.username;

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
    usersMarkup = users.map((user) => {
      const selected = selectedUser === user.username;
      return (
        <UserChatRow
          key={user.username}
          user={user}
          selectedUser={selected}
          onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.username })}
        ></UserChatRow>
      );
    });
  }

  return <div className="col-span-1 md:col-span-2 py-6 bg-gray-50 space-y-3 overflow-y-auto">{usersMarkup}</div>;
}

export default Users;
