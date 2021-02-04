import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import useLocalStorage from '../hooks/useLocalStore';
import { Link } from 'react-router-dom';

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

function Login(props) {
  const [variables, setVariables] = useState({
    username: '',
    password: '',
  });
  const [_, setToken] = useLocalStorage();

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onComplete: (data) => {
      setToken('token', data.login.token);
      props.history.push('/');
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();
    setErrors({});
    loginUser({ variables });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariables({ ...variables, [name]: value });
  };

  return (
    <div className="p-12 bg-white m-auto max-w-md rounded">
      <h1 className="text-xl font-semibold">Login</h1>
      <form className="mt-6" onSubmit={submitLoginForm}>
        <label htmlFor="firstname" className="block text-xs font-semibold text-gray-600">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="John"
          value={variables.username}
          className={`block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none rounded focus:outline-none focus:bg-gray-200 ${
            errors.username && 'border border-red-500'
          }`}
          onChange={handleInputChange}
        />
        {errors.username && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {errors.username}
          </span>
        )}
        <label htmlFor="password" className="block mt-2 font-semibold text-gray-600">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="********"
          value={variables.password}
          className={`block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none rounded focus:outline-none focus:bg-gray-200 ${
            errors.password && 'border border-red-500'
          }`}
          onChange={handleInputChange}
        />
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.password}
        </span>
        <button
          type="submit"
          className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-600 shadow-lg rounded focus:outline-none hover:bg-blue-700 hover:shadow-none"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
        <Link
          to="/register"
          className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black"
        >
          You don't have an account? Register now!
        </Link>
      </form>
    </div>
  );
}

export default Login;
