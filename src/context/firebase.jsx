import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  set,
  ref as dbRef,
  serverTimestamp as rtdbServerTimestamp,
  get,
  child,
} from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,getDocs,doc,getDoc,
  serverTimestamp as fsServerTimestamp, query,where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5s32nGrvnX5lvt-dupU0z4fyKtvgp2FY",
  authDomain: "bookify-project-44dca.firebaseapp.com",
  databaseURL: "https://bookify-project-44dca-default-rtdb.firebaseio.com",
  projectId: "bookify-project-44dca",
  storageBucket: "bookify-project-44dca.firebasestorage.app",
  messagingSenderId: "77746012692",
  appId: "1:77746012692:web:48a5b67891c90f54d09d01",
};


const app = initializeApp(firebaseConfig);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);
const googleAuth = new GoogleAuthProvider();

/* ================= REGISTER ================= */
const RegisterUser = async (firstName, lastName, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const uid = userCredential.user.uid;

  await set(dbRef(db, `users/${uid}`), {
    firstName,
    lastName,
    email,
    accountCreated: rtdbServerTimestamp(),
  });
};

/* ================= LOGIN ================= */
const LoginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

/* ================= GOOGLE LOGIN ================= */
const GoogleLogIn = () => signInWithPopup(auth, googleAuth);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  const isLoggedIn = !!user;

  const LoggedOut = async () => {
    await signOut(auth);
  };

  /* ================= CLOUDINARY ================= */
  const uploadToCloudinary = async (file) => {
    if (!file) throw new Error("No image selected");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "book_upload"); // must be unsigned

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzx5jjphs/image/upload",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!data.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return data.secure_url;
  };

  /* ================= LOGIN METHOD ================= */
  const isGoogleUser = () =>
    user?.providerData?.some(p => p.providerId === "google.com");

  /* ================= GET USER PROFILE ================= */
  const getUserProfile = async (uid) => {
    const snap = await get(child(dbRef(db), `users/${uid}`));
    return snap.exists() ? snap.val() : null;
  };

  /* ================= ADD LISTING ================= */
  const AddListing = async (
    bookName,
    author,
    price,
    isbnNum,
    coverPic,
    seller,
    sellerEmail
  ) => {
    if (!authReady || !user) {
      throw new Error("User not authenticated yet");
    }

    const imageUrl = await uploadToCloudinary(coverPic);

    let displayName = user.displayName || "Unknown User";

    if (!isGoogleUser()) {
      const profile = await getUserProfile(user.uid);
      if (!profile) {
        throw new Error("User profile missing in Realtime DB");
      }
      displayName = `${profile.firstName} ${profile.lastName}`;
    }
    

    await addDoc(collection(firestore, "books"), {
      bookName,
      author,
      price,
      isbnNum,
      coverPic: imageUrl,
      seller,
      sellerEmail,
      userID: user.uid,
      userEmail: user.email,
      displayName,
      loginProvider: isGoogleUser() ? "google" : "email",
      createdAt: fsServerTimestamp(),
    });
  };
  /*================= Getting All the Books =================*/ 
    const GettingAllBooks = async () =>{
        return await getDocs(collection(firestore,"books"));
        
    }

    /*================= Fetching Single Book =================*/ 
    const GetBook = async (bookId) =>{
        const docRef = doc(firestore,"books",bookId);
        const result = await getDoc(docRef);
        return result;
    }
    /*================= Place Order =================*/ 
    const PlaceOrder = async (bookId, qty) => {
  if (!user) {
    throw new Error("User not logged in");
  }

  const collectionRef = collection(firestore, "books", bookId, "orders");

  let username = user.displayName || "Unknown User";

  // If Email user → get name from Realtime DB
  if (!isGoogleUser()) {
    const profile = await getUserProfile(user.uid);
    if (profile) {
      username = `${profile.firstName} ${profile.lastName}`;
    }
  }

  const result = await addDoc(collectionRef, {
    username,
    userEmail: user.email,
    userId: user.uid,
    qty,
    createdAt: fsServerTimestamp(),
  });

  return result;
};

    /*================= View Place Order =================*/ 
    const ViewPlaceOrder = async (userId) =>{
        const collectionRef = collection(firestore,"books");
        const q  = query(collectionRef , where("userID", "==", userId)
);

        const result = await getDocs(q);
        return result;
    }
     /*================= Getting Placed Order Details 
     =================*/ 
     const GetDetails = async (bookId) =>{
        const collectionRef = collection(firestore,"books",bookId,"orders");
        const result = await getDocs(collectionRef);
        return result;
     }

     /*================= Checking whether Order is Confirmed or Not 
     =================*/ 

  return (
    <FirebaseContext.Provider
      value={{
        RegisterUser,
        LoginUser,
        GoogleLogIn,
        LoggedOut,
        AddListing,
       GettingAllBooks,GetBook,
       PlaceOrder,
       ViewPlaceOrder,
       GetDetails,
        isLoggedIn,
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
