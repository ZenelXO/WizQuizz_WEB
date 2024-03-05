    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
    import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyCzspdVz53ABe4ry26GbjuZGoafKHWkINQ",
    authDomain: "wiz-quizz.firebaseapp.com",
    projectId: "wiz-quizz",
    storageBucket: "wiz-quizz.appspot.com",
    messagingSenderId: "698142113065",
    appId: "1:698142113065:web:ac9df1b25aba91759c8b38",
    measurementId: "G-7RR6QBL85G"
};

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);