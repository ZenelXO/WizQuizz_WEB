import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { PreviewComponent } from './preview/preview.component';



@NgModule({
  declarations: [
    SearchComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayModule { }
