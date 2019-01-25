import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialog, MatSnackBar} from '@angular/material';
import {Repository} from '../../models/repository';
import {DataService} from '../../services/data.service';
import {User} from '../../models/user';
import {RepoDialogComponent} from '../repo-dialog/repo-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  starredRepos: Repository[];

  data: any;

  constructor(public afAuth: AngularFireAuth,
              private snackBar: MatSnackBar,
              private _dataService: DataService,
              private repoDialog: MatDialog) {

    this.starredRepos = [];
  }

  ngOnInit() {
    this.getStarredRepos();
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

  getStarredRepos() {
    this._dataService.getStarredRepositories().subscribe(result => {

      this.data = result.data();

      this.starredRepos.push(this.data.repo);

    });
  }

  openRepo(repo: Repository) {
      const dialogRef = this.repoDialog.open(RepoDialogComponent, {
        width: '90vw',
        height: '90%',
        data: repo
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

}
