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

function Users({ setSelectedUser }) {
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
    usersMarkup = data.getUsers.map((user) => (
      <UserChatRow key={user.username} user={user} onClick={() => setSelectedUser(user.username)}></UserChatRow>
    ));
  }

  return <div className="col-span-2 py-6 bg-gray-50 space-y-3 overflow-y-auto">{usersMarkup}</div>;
}

export default Users;
