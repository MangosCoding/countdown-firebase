// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, doc, getDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9Q9106A89ZYJ44xtmQ8ek7cBxtyyFd1s",
    authDomain: "countdown-mangoscoding.firebaseapp.com",
    projectId: "countdown-mangoscoding",
    storageBucket: "countdown-mangoscoding.appspot.com",
    messagingSenderId: "613565969733",
    appId: "1:613565969733:web:7a92048c11e0ba0efd7a2c",
    measurementId: "G-63PCC8F7G7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// const dbRef = collection(db, "dates");
// try {
//     await addDoc(dbRef, {
//         date: new Date('Dec 25, 2022 00:00:00')
//     });
//     console.log("Document added");
// } catch (error) {
//     console.log("Error adding document: ", error);
// }

window.onload = async () => {

    let deadline = 0;
    // const docRef = doc(db, "dates", "apuU24FcgGxJ8GBKgeNZ");
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //     deadline = docSnap.data().date.seconds * 1000;
    // } else {
    //     console.log("No such document!");
    // }

    onSnapshot(doc(db, "dates", "apuU24FcgGxJ8GBKgeNZ"), (doc) => {
        deadline = doc.data().date.seconds * 1000;
        
        document.getElementById('message').innerHTML = doc.data().message;

        const inerval = setInterval(_ => {
            const now = new Date().getTime();
            const time = deadline - now;
    
            const days = Math.floor(time / (1000 * 60 * 60 * 24));
            const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
            document.getElementById('d').innerHTML = days + 'd';
            document.getElementById('hr').innerHTML = hours + 'hrs';
            document.getElementById('min').innerHTML = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) + 'min';
            document.getElementById('sec').innerHTML = Math.floor((time % (1000 * 60)) / 1000) + 'sec';
    
            if (time < 0) {
                document.getElementById('countDown').classList.add('hidden');
                document.getElementById('messageTimeOut').innerHTML = doc.data().messageTimeOut;
                document.getElementById('timeOut').classList.remove('hidden');
                clearInterval(inerval);
            }
        }, 1000);
    });

}