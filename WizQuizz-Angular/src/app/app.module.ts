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
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environments';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
<<<<<<< HEAD
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
=======
import { InGameComponent } from './in-game/in-game.component';
import { FinishQuizzComponent } from './finish-quizz/finish-quizz.component';
>>>>>>> Itamar/Angular




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    PreviewComponent,
    HeaderComponent,
    FooterComponent,
    SignInComponent,
    CreateAccountComponent,
    UserProfileComponent,
<<<<<<< HEAD
    CreateQuizzComponent,
    CreateQuestionsComponent,
=======
    InGameComponent,
    FinishQuizzComponent,
>>>>>>> Itamar/Angular
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule
    //provideDatabase(() => getDatabase()),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
