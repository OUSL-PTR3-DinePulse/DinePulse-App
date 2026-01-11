import { account, ID } from "../lib/appwrite";

/* SIGN UP */
export const signup = async ({ email, password, fullName }) => {
  const user = await account.create(
    ID.unique(),
    email,
    password,
    fullName
  );

  // Auto login after signup
  await account.createEmailPasswordSession(email, password);

  return user;
};

/* LOGIN */
export const login = async ({ email, password }) => {
  return await account.createEmailPasswordSession(email, password);
};

/* LOGOUT */
export const logout = async () => {
  return await account.deleteSession("current");
};

/* CHECK AUTH */
export const getCurrentUser = async () => {
  return await account.get();
};


// Send reset link to email
export const sendPasswordRecovery = async (email) => {
  return await account.createRecovery(
    email,
    import.meta.env.VITE_APPWRITE_RESET_URL // redirect URL
  );
};

// Reset password using secret + userId
export const completePasswordReset = async (userId, secret, password) => {
  return await account.updateRecovery(userId, secret, password);
};
