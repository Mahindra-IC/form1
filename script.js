import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, query, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "FIRESTORE_SECRET", // Add your API key here
      authDomain: "form-43b5e.firebaseapp.com",
      projectId: "form-43b5e",
      storageBucket: "form-43b5e.appspot.com",
      messagingSenderId: "656183648856",
      appId: "1:656183648856:web:7552a31d9906de0d6fa02d"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
  
    const form = document.getElementById('form');
    const suggestionsList = document.getElementById('suggestionsList');
  
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.name.value;
        const suggestion = document.getElementById("suggestion").value;
  
        try {
            await addDoc(collection(db, 'suggestions'), {
                name: name,
                suggestion: suggestion
            });
            alert('Thank you for your suggestion!');
            form.reset(); // Clear the form fields after submission
        } catch (error) {
            console.error('Error adding suggestion: ', error);
            alert('Oops! Something went wrong. Please try again.');
        }
    });
  
    try {
        const querySnapshot = await getDocs(collection(db, 'suggestions'));
  
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const suggestionItem = document.createElement('li');
            suggestionItem.textContent = `${data.name}: ${data.suggestion}`;
            suggestionsList.appendChild(suggestionItem);
        });
  
        onSnapshot(query(collection(db, 'suggestions')), (snapshot) => {
            suggestionsList.innerHTML = ''; // Clear previous suggestions
            snapshot.forEach((doc) => {
                const data = doc.data();
                const suggestionItem = document.createElement('li');
                suggestionItem.textContent = `${data.name}: ${data.suggestion}`;
                suggestionsList.appendChild(suggestionItem);
            });
        });
    } catch (error) {
        console.error('Error fetching suggestions: ', error);
    }
