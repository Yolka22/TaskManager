// actions.js
export const setUser = (user) => {
  console.log('Action Dispatched: setUser', user);
  return {
      type: 'SET_USER',
      payload: user,
  };
};

  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  