import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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
const auth = getAuth();
const db = getFirestore(app);

var user;

const loginForm = document.getElementById('login-form');
const welcomeText = document.getElementById('welcome-text');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginLoader = document.getElementById('login-loader');
const eventLoader = document.getElementById('event-loader');

const eventForm = document.getElementById('event-form');

const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const linkInput = document.getElementById('link-input');
const imageInput = document.getElementById('image-input');

const loginSubmitButton = document.getElementById('login-submit-button');
const logoutSubmitButton = document.getElementById('logout-button');
const eventSubmitButton = document.getElementById('event-submit');

const eventTop = document.getElementById("right-top");
const eventBottom = document.getElementById("right-bottom");

const left = document.getElementById('left');
const right = document.getElementById('right');

var mobileScreen = window.matchMedia("(max-width: 450px)")

loginForm.addEventListener('submit', event => {
	event.preventDefault();

	loginLoader.style.display = "flex";
	loginSubmitButton.style.display = "none";

	const email = emailInput.value;
	const password = passwordInput.value;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			loginLoader.style.display = "none";
			loginSubmitButton.style.display = "block";

			loginForm.style.display = "none";
			welcomeText.style.display = "block";

			eventTop.style.display = "none";
			eventBottom.style.display = "flex";

			if(mobileScreen.matches){
				left.style.display = "none";
				right.style.display = "block";
			}

			user = userCredential.user;

			emailInput.value = "";
			passwordInput.value = "";

			console.log(user.uid);
		})
		.catch((error) => {
			loginLoader.style.display = "none";
			loginSubmitButton.style.display = "block";
			const errorCode = error.code;
			const errorMessage = error.message;

			emailInput.value = "";
			passwordInput.value = "";
			alert(errorMessage);
		});



})

logoutSubmitButton.addEventListener('click', event => {
	event.preventDefault();

	signOut(auth).then(() => {
		// Sign-out successful.
		loginForm.style.display = "block";
		welcomeText.style.display = "none";

		eventTop.style.display = "block";
		eventBottom.style.display = "none";

	}).catch((error) => {
		// An error happened.
	});
})


eventForm.addEventListener('submit', (event) => {
	event.preventDefault();

	if (user.uid) {

		eventLoader.style.display = "block";
		eventSubmitButton.style.display = "none";

		const title = titleInput.value;
		const date = dateInput.value;
		const link = linkInput.value;


		var filesSelected = imageInput.files;
		var fileToLoad = filesSelected[0];
		var form = new FormData();
		form.append("image", fileToLoad)

		var settings = {
			"url": "https://api.imgbb.com/1/upload?expiration=600&key=7a755d6d2367d02f1bfa76965bfdd5b9",
			"method": "POST",
			"timeout": 0,
			"processData": false,
			"mimeType": "multipart/form-data",
			"contentType": false,
			"data": form
		};



		$.ajax(settings).done(async function (response) {
			var jx = JSON.parse(response);
			var imageUrl = jx.data.url;

			const docRef = await addDoc(collection(db, "Events"), {
				Date: date,
				Title: title,
				Link: link,
				Image: imageUrl
			});

			titleInput.value = "";
			dateInput.value = "";
			linkInput.value = "";
			imageInput.value = "";

			eventLoader.style.display = "none";
			eventSubmitButton.style.display = "block";

			alert("Event added successfully!");
		});
	}

	else{
		alert("Please Log In!");
	}



})





// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//     });