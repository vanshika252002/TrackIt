import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const forgotPassword = async (email: string) => {
  const auth = getAuth();
  try {
    
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('No user found with this email. Please sign up.');
    } else {
      throw new Error('Something went wrong. Please try again later.');
    }
  }
};
