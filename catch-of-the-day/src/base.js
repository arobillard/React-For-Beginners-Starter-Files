import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAmDdYLxRe-M7kNItFz3omwWwTe5s6wqu8",
    authDomain: "react-for-beginners-ar.firebaseapp.com",
    databaseURL: "https://react-for-beginners-ar.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

export default base;