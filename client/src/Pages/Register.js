import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
      username
    }
  }
`;

function Register(props) {
  const [variables, setVariables] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push('/login'),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();
    setErrors({});
    registerUser({ variables });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariables({ ...variables, [name]: value });
  };

  return (
    <div className="p-12 bg-white m-auto max-w-md rounded">
      <h1 className="text-xl font-semibold">Register</h1>
      <form className="mt-6" onSubmit={submitRegisterForm}>
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
        <label htmlFor="email" className="block mt-2 font-semibold text-gray-600">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="john.doe@company.com"
          value={variables.email}
          className={`block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none rounded focus:outline-none focus:bg-gray-200 ${
            errors.email && 'border border-red-500'
          }`}
          onChange={handleInputChange}
        />
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.email}
        </span>
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
        <label htmlFor="password-confirm" className="block mt-2 font-semibold text-gray-600">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="********"
          value={variables.confirmPassword}
          className={`block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none rounded focus:outline-none focus:bg-gray-200 ${
            errors.confirmPassword && 'border border-red-500'
          }`}
          onChange={handleInputChange}
        />
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors.confirmPassword}
        </span>
        <button
          type="submit"
          className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-600 shadow-lg rounded focus:outline-none hover:bg-blue-700 hover:shadow-none"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign up'}
        </button>
        <Link to="/login" className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
          Already registered?
        </Link>
      </form>
    </div>
  );
}

export default Register;
