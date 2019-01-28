import {Component, OnInit} from '@angular/core';
import {Language} from '../../models/language';
import {DataService} from '../../services/data.service';
import {Repository} from '../../models/repository';
import {RepoDialogComponent} from '../repo-dialog/repo-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  languages: Language[];

  searchTime;
  searchLanguage;

  repositories: Repository[];

  searching = false;

  constructor(
    private _dataService: DataService,
    private repoDialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.repositories = [];
  }

  ngOnInit() {
    this.loadTrendingLanguages();
  }

  loadTrendingLanguages() {
    this._dataService.getTrendingLanguages().subscribe(result => {
      this.languages = result.popular;
    });

  }

  search() {

    this.repositories = [];

    this._dataService.getSpecificTrendigRepos(this.searchLanguage, this.searchTime).subscribe(result => {
      this.repositories = result;
      this.searching = true;
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

  starRepo(repo: Repository) {
    this._dataService.starRepository(repo);

    this.openSnackBar('Yaay! This worked out successfully');

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

}
