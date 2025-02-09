// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjjMvVEXVTU3I8JOdR9-OULbOZiEtPc7I",
    authDomain: "excel-spreadsheet-f31a5.firebaseapp.com",
    projectId: "excel-spreadsheet-f31a5",
    storageBucket: "excel-spreadsheet-f31a5.firebasestorage.app",
    messagingSenderId: "741360573567",
    appId: "1:741360573567:web:8d68427c3ce87b4946b34a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// PayPal Button
paypal.Buttons({
    createOrder: (data, actions) => {
        return actions.order.create({
            purchase_units: [{
                amount: { value: "0.10" }
            }]
        });
    },
    onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        const email = order.payer.email_address;
        const transactionID = order.id;
        const downloadURL = "https://yourwebsite.com/downloads/product.pdf";  // Your product's download link

        // Store order in Firestore (previously covered)
        await addDoc(collection(db, "orders"), {
            email,
            transactionID,
            downloadURL,
            timestamp: serverTimestamp()
        });

        // Send email using Google Apps Script
        const emailBody = {
            email: email,
            downloadLink: downloadURL
        };

        await fetch("https://script.google.com/macros/s/AKfycbzOhTcWyWskhWkUEPBMB2CE7S0etHZZFNGw0qgKkd_92UeJzePS419nPerWv7WV7e8/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailBody),
        });

        alert("Payment successful! Check your email for the download link.");
    }
}).render("#paypal-button-container");
