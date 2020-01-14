import app from 'firebase/app'

const config = {
  apiKey: "AIzaSyCLTKPgI0qiXgPn2h1zzHfIjdpgcgsLBio",
  authDomain: "strategy-simulator.firebaseapp.com",
  databaseURL: "https://strategy-simulator.firebaseio.com",
  projectId: "strategy-simulator",
  storageBucket: "strategy-simulator.appspot.com",
  messagingSenderId: "699964777883",
  appId: "1:699964777883:web:e15ba7720050d8b539ad3e",
  measurementId: "G-BDJDDVDRM2"
};

class Firebase{
    constructor(){
        app.initializeApp(config);
    }
}

export default Firebase;
