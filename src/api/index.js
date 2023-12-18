import { db } from "./firebase";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  collection,
  limit,
  limitToLast,
  getCountFromServer,
  query,
  where,
  or,
  orderBy,
  startAfter,
  endBefore,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { logout, useLocalStorage, getRequestError } from "../utils/functions";
import {
  APP_API_GUESTS,
  APP_USER,
  APP_API_GET_LIMIT,
} from "../utils/constants";

const guestsColl = collection(db, APP_API_GUESTS);

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

export const getOverviewDataAction = async () => {
  const checkedInQuery = query(guestsColl, where("checked_in", "==", true));
  const checkedInSnapshot = await getCountFromServer(checkedInQuery);

  const uncheckedQuery = query(guestsColl, where("checked_in", "==", false));
  const uncheckedSnapshot = await getCountFromServer(uncheckedQuery);

  let data = {
    checked_in: checkedInSnapshot.data().count,
    unchecked: uncheckedSnapshot.data().count,
  };

  return data;
};

export const addGuestAction = async (data) => {
  const guestsRef = guestsColl;

  try {
    await setDoc(doc(guestsRef), data);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

export const getGuestsAction = async (data) => {
  const q = guestsColl;
  const snapshot = await getCountFromServer(q);

  let querySnapshot = null;

  if (data?.paginatePrev && data?.firstRecord) {
    querySnapshot = await getDocs(
      query(
        guestsColl,
        orderBy("created_at", "asc"),
        endBefore(data?.firstRecord),
        limitToLast(APP_API_GET_LIMIT)
      )
    );
  } else if (data?.paginateNext && data?.lastRecord) {
    querySnapshot = await getDocs(
      query(
        guestsColl,
        orderBy("created_at", "asc"),
        startAfter(data?.lastRecord),
        limit(APP_API_GET_LIMIT)
      )
    );
  } else if (data?.searchInput) {
    querySnapshot = await getDocs(
      query(
        guestsColl,
        or(
          where("name", "==", data?.searchInput),
          where("code", "==", data?.searchInput),
          where("phone", "==", data?.searchInput)
        ),
        limit(APP_API_GET_LIMIT)
      )
    );
  } else {
    querySnapshot = await getDocs(
      query(guestsColl, orderBy("created_at", "asc"), limit(APP_API_GET_LIMIT))
    );
  }

  if (data?.searchInput) {
    querySnapshot = await getDocs(
      query(
        guestsColl,
        or(
          where("name", "==", data?.searchInput),
          where("code", "==", data?.searchInput),
          where("phone", "==", data?.searchInput)
        ),
        limit(APP_API_GET_LIMIT)
      )
    );
  }

  let guests = {
    total: snapshot.data().count,
    data: [],
  };

  querySnapshot.forEach((doc) => {
    guests.data.push({ ...doc.data(), id: doc.id });
  });

  return {
    guests,
    firstRecord: querySnapshot.docs[0],
    lastRecord: querySnapshot.docs[querySnapshot.docs.length - 1],
  };
};

export const checkInGuestAction = async (data) => {
  const guestsRef = doc(db, APP_API_GUESTS, data?.id);

  try {
    await updateDoc(guestsRef, {
      ...data?.data,
    });
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

export const deleteGuestAction = async (data) => {
  try {
    await deleteDoc(doc(db, APP_API_GUESTS, data));
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};
