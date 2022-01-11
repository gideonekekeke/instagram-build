import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

export const app = firebase.initializeApp({
	apiKey: "AIzaSyAtkXWO3UlWoQx2xkpfECKnlYWHTTCvNP0",
	authDomain: "my-port-698b3.firebaseapp.com",
	databaseURL: "https://my-port-698b3.firebaseio.com",
	projectId: "my-port-698b3",
	storageBucket: "my-port-698b3.appspot.com",
	messagingSenderId: "18948149030",
	appId: "1:18948149030:web:54dc53124a0041de29fbe7",
});
