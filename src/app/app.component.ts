import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyBR6SxeDjHAf-4r1Tfblsls4kRAPB9TuP4",
      authDomain: "blog-with-angular-d34e0.firebaseapp.com",
      databaseURL: "https://blog-with-angular-d34e0-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "blog-with-angular-d34e0",
      storageBucket: "blog-with-angular-d34e0.appspot.com",
      messagingSenderId: "487593401688",
      appId: "1:487593401688:web:40d6cb74a2ac3e009b192d",
      measurementId: "G-1YHV7V7YLR"
    };
    // Initialize Firebase
    firebase.default.initializeApp(firebaseConfig);
  }
}
