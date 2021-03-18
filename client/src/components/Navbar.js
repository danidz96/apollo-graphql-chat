import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '@context/auth';

function Navbar() {
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/login'
  };

  return (
    <div className="h-12 w-9/12 flex justify-end items-center">
      {user ? (
        <Link to="/login">
          <button onClick={logout}>Logout</button>
        </Link>
      ) : (
        <>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register" className="ml-3">
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
