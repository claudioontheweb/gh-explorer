import {Component, OnInit} from '@angular/core';
import {auth} from 'firebase';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {compilePipeFromMetadata} from '@angular/compiler';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorCode;
  errorMessage;

  private usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  newUser: any = {
    email: '',
    family_name: '',
    gender: '',
    given_name: '',
    id: '',
    link: '',
    locale: '',
    name: '',
    picture: '',
    verified_email: ''
  };

  repos = [];

  loggedIn = false;

  constructor(public afAuth: AngularFireAuth,
              private snackBar: MatSnackBar,
              private aF: AngularFirestore,
              public dialogRef: MatDialogRef<LoginComponent>,
              private _dataService: DataService) {

    this.usersCollection = aF.collection<User>('users');
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {

      this.newUser = result.additionalUserInfo.profile;

      localStorage.setItem('gh_user_id', this.newUser.id);

      this.aF.firestore.doc('/users/' + this.newUser.id).get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            this.loggedIn = true;

            window.location.reload();
            this.dialogRef.close();

          } else {
            this.usersCollection.doc(this.newUser.id).set({
              uid: this.newUser.id,
              given_name: this.newUser.given_name,
              family_name: this.newUser.family_name,
              email: this.newUser.email
            }).then(resp => {

              this.loggedIn = true;

              window.location.reload();
              this.dialogRef.close();

            }).catch(err => {
              this.openSnackBar('Ooops, Error ' + err.errorCode + ': ' + err.errosMessage);
            });
          }
        });

    }).catch(error => {
      this.errorCode = error.code;
      this.errorMessage = error.message;

      this.openSnackBar('Ooops, Error ' + this.errorCode + ': ' + this.errorMessage);

    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

}
