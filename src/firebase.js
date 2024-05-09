
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAfL7CE6N9YtCNXez7KeQ8c1OF2Z4io1hw",
  authDomain: "netflix-clone-cfd81.firebaseapp.com",
  projectId: "netflix-clone-cfd81",
  storageBucket: "netflix-clone-cfd81.appspot.com",
  messagingSenderId: "1024060335576",
  appId: "1:1024060335576:web:852741a55ac5ae8044bead"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const singup= async(name,email,password)=>{
    try{
        const res= await createUserWithEmailAndPassword(auth,email,password);
         const user= res.user;
         await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,authProvider:"local",
            email,
         });
    }catch(error){
           console.log(error);
           toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async(email,password)=>{
    try {
         await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout= ()=>{
    signOut(auth)
}

export {auth,db,login,singup,logout};