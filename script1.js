// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import * as XLSX from 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';

const firebaseConfig = {
    apiKey: "AIzaSyAmcmGoJUxsbcyceddAi0Y0zQGZhUSddeE", // Add your API key here
      authDomain: "form-43b5e.firebaseapp.com",
      projectId: "form-43b5e",
      storageBucket: "form-43b5e.appspot.com",
      messagingSenderId: "656183648856",
      appId: "1:656183648856:web:7552a31d9906de0d6fa02d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function fetchDataAndExportToExcel() {
    const data = [];
    
    getDocs(collection(db, "suggestions")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
     console.log("Retrieved Firestore Data:", data);
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const ws = XLSX.utils.book_new();

      data.forEach((item, index) => {
        const values = Object.values(item);
        const arr = keys.map((key) => item[key]);
        XLSX.utils.book_append_sheet(ws, XLSX.utils.aoa_to_sheet([keys, arr]), `Sheet${index + 1}`);
      });

      const wbout = XLSX.write(ws, { bookType: 'xlsx', type: 'binary' });
      const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "firestore_data.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("No data to export.");
    }
    });
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

export { fetchDataAndExportToExcel };
