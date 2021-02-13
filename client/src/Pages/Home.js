import { gql, useQuery } from '@apollo/client';

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
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
    usersMarkup = data.getUsers.map((user) => (
      <div key={user.username}>
        <p>{user.username}</p>
      </div>
    ));
  }

  return <div>{usersMarkup}</div>;
}

export default Home;
