import useTimeAgo from '@hooks/useTimeAgo';

function UserChatRow({ user, onClick }) {
  const timeago = useTimeAgo(user.latestMessage?.createdAt);
  return (
    <div className="flex cursor-pointer hover:bg-gray-100 py-2 px-3" onClick={onClick}>
      <img
        src={user.imageUrl || 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
        alt={`${user.username} profile`}
        className="rounded-full w-14 h-14 object-cover"
      />
      <div className="ml-2 flex flex-col justify-evenly flex-1">
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
