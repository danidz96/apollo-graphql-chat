import { useState } from 'react';
import Users from './Users';
import Messages from './Messages';

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="w-full h-96 bg-white grid grid-cols-6 rounded-sm shadow-md" style={{ height: '85vh' }}>
      <Users setSelectedUser={setSelectedUser} />
      <Messages selectedUser={selectedUser} />
    </div>
  );
}

export default Home;
