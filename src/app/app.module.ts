import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './modules/material/material.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {RepoDialogComponent} from './components/repo-dialog/repo-dialog.component';
import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';
import {NgHttpLoaderModule} from 'ng-http-loader';
import {LayoutModule} from '@angular/cdk/layout';
import {OAuthModule} from 'angular-oauth2-oidc';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    RepoDialogComponent,
    SearchComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    NgScrollbarModule,
    NgHttpLoaderModule.forRoot(),
    LayoutModule,
    OAuthModule.forRoot(),
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RepoDialogComponent,
    LoginComponent
  ]
})
export class AppModule {
}
