function loadFirebaseAndXLSX() {
    const firebaseScript = document.createElement('script');
    firebaseScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
    firebaseScript.onload = function () {
      const firestoreScript = document.createElement('script');
      firestoreScript.src = 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
      firestoreScript.onload = function () {
        initializeFirebase();
      };
      document.head.appendChild(firestoreScript);
    };
    document.head.appendChild(firebaseScript);
  }
  
  // Initialize Firebase and set up Firestore
  function initializeFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyAmcmGoJUxsbcyceddAi0Y0zQGZhUSddeE", // Add your API key here
        authDomain: "form-43b5e.firebaseapp.com",
        projectId: "form-43b5e",
        storageBucket: "form-43b5e.appspot.com",
        messagingSenderId: "656183648856",
        appId: "1:656183648856:web:7552a31d9906de0d6fa02d"
    };
    firebase.initializeApp(firebaseConfig);
    
    // Continue with the rest of your JavaScript logic (fetchDataAndExportToExcel, s2ab functions, etc.)
  }
  
  // Load Firebase and XLSX
  loadFirebaseAndXLSX();
const db = firebase.firestore();

    function fetchDataAndExportToExcel() {
      const data = [];
      
      db.collection("suggestions").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Firestore Data");
        
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
        const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "firestore_data.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }