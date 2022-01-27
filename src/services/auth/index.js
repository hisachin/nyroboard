import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";

import { auth, googleProvider, facebookProvider } from "../../firebase";

const _handleGoogleLogin = async () => {
  return signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return { user, token };
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
};

const _handleFacebookLogin = async () => {
  return signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // This gives you a facebook Access Token.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return { user, token };
    })
    .catch((error) => {
      console.log(error);
      return {};
    });
};

export const handleLogin = async (loginProvider) => {
  if (loginProvider === "google") {
    return _handleGoogleLogin();
  } else if (loginProvider === "facebook") {
    return _handleFacebookLogin();
  }
};

export const Logout = async () => {
  signOut(auth)
    .then(() => {
      localStorage.clear();
      sessionStorage.clear();
    })
    .catch((error) => {
      console.log(error);
    });
};
