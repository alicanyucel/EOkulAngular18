import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from './components/blank/blank.component';
import { SectionComponent } from './components/blank/section/section.component';
import { FlexiGridModule } from 'flexi-grid';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlankComponent,
    SectionComponent,
    FlexiGridModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    BlankComponent,
    SectionComponent,
    FlexiGridModule,
    FormsModule
  ]
})
export class SharedModule { }
