import Users from './Users';
import Messages from './Messages';

function Home() {
  return (
    <div className="w-full h-96 bg-white grid grid-cols-6 rounded-sm shadow-md" style={{ height: '85vh' }}>
      <Users />
      <Messages />
    </div>
  );
}

export default Home;
