import firebase from 'firebase/app';
import 'firebase/auth';

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

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};


export const createUserProfileDocument=async (userAuth, additionalData)=>{


  }