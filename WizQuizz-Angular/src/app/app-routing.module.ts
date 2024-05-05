import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SearchComponent} from "./search/search.component";
import {PreviewComponent} from "./preview/preview.component";
import { SignInComponent } from './sign-in/sign-in.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateQuizzComponent } from './create-quizz/create-quizz.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'preview',
    component: PreviewComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'create-quizz',
    component: CreateQuizzComponent
  },
  {
    path: 'create-questions',
    component: CreateQuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
