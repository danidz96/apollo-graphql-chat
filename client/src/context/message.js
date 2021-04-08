import React, { createContext, useReducer, useContext } from 'react';

const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

const messageReducer = (state, action) => {
  const { username, messages, message } = action.payload;
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_USER_MESSAGES': {
      const users = [...state.users];
      let userIndex = users.findIndex((user) => user.username === username);
      users[userIndex] = { ...users[userIndex], messages };

      return {
        ...state,
        users,
      };
    }
    case 'SET_SELECTED_USER': {
      const users = state.users.map((user) => ({ ...user, selected: user.username === action.payload }));
      return { ...state, users };
    }
    case 'ADD_MESSAGE': {
      const users = [...state.users];
      const userIndex = users.findIndex((user) => user.username === username);
      const updatedUser = {
        ...users[userIndex],
        messages: [message, ...users[userIndex].messages],
        latestMessage: message,
      };
      users[userIndex] = updatedUser;
      return {
        ...state,
        users,
      };
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const initialState = { users: null };

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>{children}</MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

export const useMessageState = () => useContext(MessageStateContext);
export const useMessageDispatch = () => useContext(MessageDispatchContext);
