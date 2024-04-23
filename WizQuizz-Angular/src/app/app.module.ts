import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {AppComponent} from "./app.component";
import {SearchComponent} from "./search/search.component";
import {PreviewComponent} from "./preview/preview.component";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    PreviewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"wiz-quizz","appId":"1:698142113065:web:ac9df1b25aba91759c8b38","databaseURL":"https://wiz-quizz-default-rtdb.firebaseio.com","storageBucket":"wiz-quizz.appspot.com","apiKey":"AIzaSyCzspdVz53ABe4ry26GbjuZGoafKHWkINQ","authDomain":"wiz-quizz.firebaseapp.com","messagingSenderId":"698142113065","measurementId":"G-7RR6QBL85G"})),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
