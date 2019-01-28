import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Language} from '../models/language';
import {Repository} from '../models/repository';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {User} from '../models/user';
import GetOptions = firebase.firestore.GetOptions;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  repoBaseUrl = 'https://github-trending-api.now.sh/repositories';
  languagesUrl = 'https://github-trending-api.now.sh/languages';

  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private http: HttpClient,
              private aF: AngularFirestore) {
    this.usersCollection = aF.collection<User>('users');
  }

  getTrendingRepos(): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.repoBaseUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSpecificTrendigRepos(language: string, since: string): Observable<Repository[]> {
    return this.http.get<Repository[]>(this.repoBaseUrl + '?language=' + language + '&since=' + since)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTrendingLanguages(): Observable<any> {
    return this.http.get(this.languagesUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStarredRepositories() {

    const user_id = localStorage.getItem('gh_user_id');

    return this.usersCollection.doc(user_id).get().pipe(
      catchError(this.handleError)
    );

  }

  starRepository(repo: Repository) {
    const user_id = localStorage.getItem('gh_user_id');


    this.getStarredRepositories().subscribe(result => {

      if (result.data().repo == null) {

        console.log('no repos yet...');

        const arr = [];
        arr.push(repo);

        this.usersCollection.doc(user_id).update({
          repo: arr
        }).then(resp => {
          console.log(resp);
        }, err => {
          console.log(err);
        });

      } else {

        console.log('already repos');

        const arr = [];
        for (let i = 0; i < result.data().repo.length; i++) {
          arr.push(result.data().repo[i]);
        }

        arr.push(repo);
        console.log(arr);

        this.usersCollection.doc(user_id).update({
          repo: arr
        }).then(resp => {
          console.log(resp);
        }, err => {
          console.log(err);
        });
      }

    });


  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
