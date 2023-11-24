import { db } from "./firebase";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,
  limit,
  query,
  where,
  getDocs,
  // getDoc,
} from "firebase/firestore";

import { logout, useLocalStorage, getRequestError } from "../utils/functions";
import { APP_USER } from "../utils/constants";

const userCollection = collection(db, "user");

export const loginUserAction = async (data) => {
  const email = data?.email;
  const password = data?.password;

  const res = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      useLocalStorage.set(APP_USER, userCredential.user);
      window.location.assign("/home");
    })
    .catch((error) => {
      const errorMessage = error.message;
      getRequestError(errorMessage);
    });

  return res;
};

export const logoutUserAction = () => {
  signOut(auth)
    .then(() => {
      logout();
    })
    .catch((error) => {
      const errorMessage = error.message;
      getRequestError(errorMessage);
    });
};

export const getOverviewDataAction = async (data) => {
  const uid = data.uid.trim();
  const userQ = query(userCollection, where("uid", "==", uid), limit(1));

  const influencerCollection = collection(db, "influencer");
  const influencerQ = query(
    influencerCollection,
    where("uid", "==", uid),
    limit(1)
  );

  const userResult = await getDocs(userQ);
  const influencerResult = await getDocs(influencerQ);

  console.log(userResult, "userResult");
  console.log(influencerResult, "influencerResult");

  return {
    checked: 30,
    unchecked: 1200,
  };
};
