import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Repository} from '../../models/repository';
import {RepoDialogComponent} from '../repo-dialog/repo-dialog.component';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  mobile = false;

  constructor(public afAuth: AngularFireAuth,
              public breakpointObserver: BreakpointObserver,
              private snackBar: MatSnackBar,
              private loginDialog: MatDialog
            ) {
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobile = false;
        } else {
          this.mobile = true;
        }
      });
  }

  openLoginDialog() {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '90vw',
      height: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(result => {
      this.openSnackBar('Successfully logged out!');
    }).catch(error => {
      this.openSnackBar(error);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

}
