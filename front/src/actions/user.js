export const SAVE_USER = 'SAVE_USER';
export const LOGIN = 'LOGIN';
export const CHANGE_VALUE_LOGIN = 'CHANGE_VALUE_LOGIN';
export const CHANGE_VALUE_SIGNUP = 'CHANGE_VALUE_SIGNUP';
export const SIGN_UP = 'SIGN_UP';
<<<<<<< HEAD

=======
>>>>>>> 3c8310a17d291735b055793306837692a0137e53

export const saveUser = (id, departement, email, logged, firstName, lastName) => ({
  type: SAVE_USER,
  id,
  departement,
  logged,
  firstName,
  lastName,
  email,
});

export const login = () => ({
  type: LOGIN,
});

export const changeValueLogin = (value, key) => ({
  type: CHANGE_VALUE_LOGIN,
  value,
  key,
});

export const changeValueSignup = (value, key) => ({
  type: CHANGE_VALUE_SIGNUP,
  value,
  key,
});

export const signUp = () => ({
  type: SIGN_UP,
});
