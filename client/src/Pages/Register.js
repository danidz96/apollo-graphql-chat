import { useState } from 'react';

function Register() {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();
    console.log(state);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
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
          value={state.username}
          className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded focus:outline-none focus:bg-gray-300"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="email" className="block mt-2 font-semibold text-gray-600">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="john.doe@company.com"
          value={state.email}
          className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded focus:outline-none focus:bg-gray-300"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="password" className="block mt-2 font-semibold text-gray-600">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="********"
          value={state.password}
          className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none rounded focus:outline-none focus:bg-gray-300"
          required
          onChange={handleInputChange}
        />
        <label htmlFor="password-confirm" className="block mt-2 font-semibold text-gray-600">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="********"
          value={state.confirmPassword}
          className="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
          required
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-blue-600 shadow-lg rounded focus:outline-none hover:bg-blue-700 hover:shadow-none"
        >
          Sign up
        </button>
        <p className="flex justify-between mt-4 text-xs text-gray-500 cursor-pointer hover:text-black">
          Already registered?
        </p>
      </form>
    </div>
  );
}

export default Register;
