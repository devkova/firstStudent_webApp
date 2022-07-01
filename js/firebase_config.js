var firebaseConfig = {
    apiKey: "AIzaSyA9poYwhekh7079bRnkSu3uIosuS0-bsP0",
    authDomain: "pin-zdravko-d22ad.firebaseapp.com",
    databaseURL: "https://pin-zdravko-d22ad-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "pin-zdravko-d22ad",
    storageBucket: "pin-zdravko-d22ad.appspot.com",
    messagingSenderId: "810461590141",
    appId: "1:810461590141:web:8df9a2f727b3e962acf714",
    measurementId: "G-JQDJKT95BV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var oDb = firebase.database();
var oDbDjelatnosti = oDb.ref('djelatnost');
var oDbGradovi = oDb.ref('grad');
var oDbKoordinate = oDb.ref('koordinata');
var oDbOrdinacije = oDb.ref('ordinacija');
var oDbPostanski_brojevi = oDb.ref('postanski_broj');
var oDbRadna_mjesta = oDb.ref('radno_mjesto');
var oDbZaposlenici = oDb.ref('zaposlenik');
