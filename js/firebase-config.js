// Configurações do projeto Firebase — Divas da Compostagem
const firebaseConfig = {
    apiKey:            "AIzaSyDIMfLXEF-BUSgrdPQQQRWbaPsB3CA-UHc",
    authDomain:        "financeiro-divas.firebaseapp.com",
    projectId:         "financeiro-divas",
    storageBucket:     "financeiro-divas.firebasestorage.app",
    messagingSenderId: "607237615953",
    appId:             "1:607237615953:web:95cd12a38416b62d57e370"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Banco de dados Firestore
const db = firebase.firestore();
