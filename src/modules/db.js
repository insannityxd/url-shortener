require("dotenv").config();

const firebase = require("firebase");

const gen = require("../utils/generate.js").gen;

function initialize() {

    console.log("[DB] Initializing database...")

    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId,
        measurementId: process.env.measurementId
    }
    
    const app = firebase.initializeApp(firebaseConfig);
    
    db = firebase.database();
    
    console.log("[DB] Database initialized.")
    
    console.log(`-------------------------------------------------------------`);

}

async function checkURL(url) {

    let status = {valid: false};

    await db.ref(`shortener/urls/${url}`).once("value", snapshot => {
        if(!snapshot.exists() || snapshot.val().url == null) return;

        snapshot = snapshot.val();

        status = {valid: true, url: snapshot.url};
    })

    return status;

}

async function shortURL(url) {

    let short_url = await gen(6);

    await db.ref(`shortener/urls/${short_url}`)
    .set({
        url: url
    })

    return short_url;

}

module.exports.initialize = initialize;

module.exports.checkURL = checkURL; // checa se o link encurtado é valido.

module.exports.shortURL = shortURL; // encurta o URL.
