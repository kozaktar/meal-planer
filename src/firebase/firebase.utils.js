import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

const userAPIpath='http://localhost:3001/users'

const config={
    apiKey: "AIzaSyCaEY2wI_BYydMA0FjcoJyd0DqJ3w5bEFc",
    authDomain: "recipie-box.firebaseapp.com",
    databaseURL: "https://recipie-box.firebaseio.com",
    projectId: "recipie-box",
    storageBucket: "",
    messagingSenderId: "239234207082",
    appId: "1:239234207082:web:7d3013f75728eb36eba913"
}

firebase.initializeApp(config);

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};


export const createUserProfileDocument=async (userAuth, name)=>{
  if(!userAuth)
    return
  let user=null;

  

  const response=await axios.get(userAPIpath.concat('/'+userAuth.uid));
  user=response.data;
  

  if(!user){
    let {displayName, email}=userAuth;
    if(name)
      {displayName=name;
        console.log("display name provided: ",displayName)}

      user={
      displayName: displayName,
      email,
      authID: userAuth.uid,
    }

    axios.post(userAPIpath,user).then(res=>console.log(res.data)).catch(e=>console.log(e))

  }

  return user;
  }