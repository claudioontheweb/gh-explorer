import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/user';
import {Repository} from '../../models/repository';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {

  user_id;
  userCollection;

  repos: Repository[];

  constructor(private aF: AngularFirestore) {
    this.user_id = localStorage.getItem('gh_user_id');

    this.userCollection = aF.collection<User>('users');
  }

  ngOnInit() {
    this.getRepos();

  }

  getRepos() {
    this.userCollection.doc(this.user_id).get().then((result) => {

      if (result.exists) {
        this.repos = result.repos;

      } else {
        console.log('no such document...');
      }
    }).catch(error => {
      console.log(error);
    });
  }


}
