import {Component, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Language} from '../../models/language';
import {Repository} from '../../models/repository';
import {MatDialog} from '@angular/material';
import {RepoDialogComponent} from '../repo-dialog/repo-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularLanguages: Language[];
  topJavascriptRepos: Repository[];
  popularRepos: Repository[];

  topJavaScriptLoading = true;
  topReposLoading = true;
  topLangLoading = true;

  constructor(private _dataService: DataService,
              private repoDialog: MatDialog) {

    this.popularRepos = [];
    this.popularLanguages = [];
    this.topJavascriptRepos = [];

  }

  ngOnInit() {
    this.getData();
  }

  getData() {

    this.loadTrendingRepos();
    this.loadJSRepos();
    this.loadTrendingLanguages();

  }

  loadTrendingLanguages() {
    this._dataService.getTrendingLanguages().subscribe(result => {
      this.popularLanguages = result.popular;
      this.topJavaScriptLoading = false;
    });

  }

  loadJSRepos() {
    this._dataService.getSpecificTrendigRepos('javascript', 'weekly').subscribe(result => {
      this.topJavascriptRepos = result;
      this.topLangLoading = false;
    });
  }

  loadTrendingRepos() {
    this._dataService.getTrendingRepos().subscribe(result => {
      this.popularRepos = result;
      this.topReposLoading = false;
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
