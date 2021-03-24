import { useAuthState } from '@context/auth/';

function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.username;

  return (
    <div className={`flex ${sent && 'ml-auto'} mb-6`}>
      <div className={`py-2 px-3 rounded-3xl ${sent ? ' bg-blue-500' : 'bg-gray-200'}`}>
        <p className={`${sent ? 'text-white' : 'text-black'}`} key={message.uuid}>
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default Message;
