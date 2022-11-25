// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGwp0-86_qGZqVEUVx0b774sEheW3wrz4",
    authDomain: "metamaterialsclub.firebaseapp.com",
    databaseURL: "https://metamaterialsclub-default-rtdb.firebaseio.com",
    projectId: "metamaterialsclub",
    storageBucket: "metamaterialsclub.appspot.com",
    messagingSenderId: "583168809891",
    appId: "1:583168809891:web:3435aef684076bb160d816"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const querySnapshot = await getDocs(collection(db, "Events"));


const upcomingEventDiv = document.getElementById('upcoming-events');
const upcomingNoEventDiv = document.getElementById('upcoming-no-events');

let upcomingEventCount = 0;

const pastEventDiv = document.getElementById('past-events');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let unclearedDiv = true;

querySnapshot.forEach((doc) => {
    const data = doc.data();

    const time = data.Date;

    const currentTime = new Date();
    const eventTime = new Date(time);


    const date = eventTime.getDate();
    const monthNo = eventTime.getMonth();
    const month = months[monthNo];
    const year = eventTime.getFullYear();

    const eventLink = data.Link;
    const image = data.Image;
    const title = data.Title;


    const eventDiv = document.createElement('div');
    eventDiv.className = 'event row col-sm-6';

    const eventInfo = `
    <div class="event-time col-sm-3">
        <div class="time">
            <p>${date} ${month}  <br> ${year}</p>
        </div>
    </div>
    <div class="event-details col-sm-9">
        <a target="_blank" id="event" href="${eventLink}">
            <img src="${image}" alt="" srcset="">
            <p class="caption">${title}</p>
        </a>
    </div>
    `

    eventDiv.innerHTML = eventInfo;

    if(unclearedDiv){
        upcomingEventDiv.innerHTML = "";
        pastEventDiv.innerHTML = "";
        unclearedDiv = false;
    }
    

    if(currentTime < eventTime){
        upcomingEventCount++;
        upcomingEventDiv.appendChild(eventDiv);
    }
    else{
        pastEventDiv.appendChild(eventDiv);
    }
    
    
});

if(upcomingEventCount<1){
    upcomingNoEventDiv.style.display = 'block';
}