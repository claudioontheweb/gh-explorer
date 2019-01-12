import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Repository} from '../../models/repository';

@Component({
  selector: 'app-repo-dialog',
  templateUrl: './repo-dialog.component.html',
  styleUrls: ['./repo-dialog.component.scss']
})
export class RepoDialogComponent implements OnInit {

  repository: Repository;

  constructor(public dialogRef: MatDialogRef<RepoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Repository) {

    this.repository = data;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
