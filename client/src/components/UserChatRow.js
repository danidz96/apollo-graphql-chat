import useTimeAgo from '@hooks/useTimeAgo';

function UserChatRow({ user, onClick, selectedUser }) {
  const timeago = useTimeAgo(user.latestMessage?.createdAt);
  return (
    <div
      className={`flex cursor-pointer justify-center hover:bg-gray-100 py-2 px-3 ${selectedUser && 'bg-white'}`}
      onClick={onClick}
    >
      <img
        src={user.imageUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
        alt={`${user.username} profile`}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="hidden md:flex ml-2  flex-col justify-evenly flex-1">
        <div className="flex items-center">
          <p className="font-medium capitalize flex-1">{user.username}</p>
          <span className="font-light text-xs text-gray-600">{timeago}</span>
        </div>
        {user.latestMessage?.content && (
          <>
            <p className="font-light text-sm">{user.latestMessage.content}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default UserChatRow;
